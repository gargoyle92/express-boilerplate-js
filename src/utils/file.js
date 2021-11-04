import multer from 'multer';
import AWSUtility from './aws';
import gm from 'gm';
import mkdirp from 'mkdirp';
import path from 'path';
import async from './async';
import mimeTypeStr from './mimetype';
import { upload as uploadConfig } from '../../config/index';
import { FILE_MODE, FILE_TYPE } from '../constants/type';
import Utility from './utility';
import NcloudUtility from './ncloud';

// Create upload path first
export const publicPath = uploadConfig.directoryPublic;
export const uploadPath = path.resolve(__dirname, '../../', uploadConfig.directory);
// mkdirp.sync(publicPath);
mkdirp.sync(uploadPath);
// Init multer
const storage = multer.diskStorage({
  destination: async (req, file, cb) => cb(null, uploadPath + "/"),
  filename: async (req, file, cb) => {
    // cb(null, (await DateTimUtil.now('yyyyMMddHHmmss')) + '-' + file.originalname);
    cb(null, file.originalname);
  },
});
export const upload = multer({
  storage: storage,
  limits: {
    // Allow up to 50MB
    fileSize: 1024 * 1024 * 50,
  },
});

export const uploadHandler = async(async (req, res, next) => {
  const { mode, isThumbnail } = req.body;
  const file = req.file != null ? JSON.parse(JSON.stringify(req.file)) : null; // single
  const files = req.files != null ? JSON.parse(JSON.stringify(req.files)) : null; // array, fields

  const verifyMode = Utility.isEmpty(mode) && Utility.isEmpty(file) && Utility.isEmpty(files) ? true : Utility.isInclude(FILE_MODE, mode);
  if (!verifyMode) throw 'InvalidMode';
  if (!Utility.isEmpty(req.admin)) req.body.registererId = req.admin.adminId;
  if (Utility.isEmpty(req.body.ip)) req.body.ip = req.connection.remoteAddress;

  //array , fields
  if (req.files != null) {
    let promises = [];
    req.file = {};
    for (let key in req.files) {
      req.file[key] = [];
      promises = promises.concat(req.files[key].map((file, i) => createPromise(file, mode, isThumbnail).then((url) => (req.file[key][i] = url))));
    }
    await Promise.all(promises);
  } else if (req.file != null) {
    // single
    await Promise.resolve(createPromise(req.file, mode, isThumbnail).then((url) => (req.file[req.file.fieldname] = url.join(','))));
  }
  next();
});

async function createPromise(file, mode, isThumbnail) {
  if (isThumbnail == 'true') {
    const isFileType = Utility.validateFileType(FILE_TYPE.IMAGE, file.mimetype);
    if (!isFileType) throw 'InvalidFileType';
    const thumbFileName = file.filename.split(mimeTypeStr(FILE_TYPE.IMAGE, file.mimetype))[0] + '.thumb' + mimeTypeStr(FILE_TYPE.IMAGE, file.mimetype);
    const thumbnail = await writeGM(gm(file.path).flatten().autoOrient().resize(256, 256, '>').noProfile(), thumbFileName);
    // if (uploadConfig.isS3) await AWSUtility.s3UploadFiles(mode + '/' + thumbFileName, thumbnail, uploadConfig.url + publicPath, file.mimetype);
    if (uploadConfig.isObjectStorage) await NcloudUtility.objectStorageFileUploader(mode + '/' + thumbFileName, thumbnail);
  }
  // Promise.all([AWSUtility.s3UploadFiles(mode + '/' + file.filename, file.path, uploadConfig.url + publicPath, file.mimetype)]);

  return await Promise.all([NcloudUtility.objectStorageFileUploader(mode + '/' + file.filename, file.path)]);
}

async function writeGM(gmObject, filename) {
  const filePath = path.resolve(uploadConfig.directory, filename);
  const publicPath = path.resolve(uploadConfig.directoryPublic, filename);
  return new Promise((resolve, reject) =>
    gmObject.write(filePath, (err) => {
      if (err) {
        console.log(err);
        return reject();
      }
      resolve();
    }),
  ).then(() => filePath);
}
export default function (req, res, next) {
  return upload(req, res, (err) => {
    if (err) next(err);
    else uploadHandler(req, res, next);
  });
}
