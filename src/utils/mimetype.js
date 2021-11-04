import { FILE_TYPE } from '../constants/type';

const DOCUMENT_MIMETYPE = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/msword': '.dot',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template': '.dotx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.template': '.xltx',
  'application/vnd.ms-excel.sheet.macroEnabled.12': 'xlsm',
  'application/vnd.ms-excel.template.macroEnabled.12': 'xltm',
  'application/vnd.ms-excel.addin.macroEnabled.12': 'xlam',
  'application/vnd.ms-excel.sheet.binary.macroEnabled.12': 'xlsb',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
  'application/x-hwp': '.hwp',
  'application/haansofthwp': '.hwp',
  'application/vnd.hancom.hwp': '.hwp',
};

const AUDIO_MIMETYPE = {};
const VIDEO_MIMETYPE = {};
const IMAGE_MIMETYPE = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
};

export default function mimeTypeStr(filetype, mimetype) {
  switch (filetype) {
    case FILE_TYPE.DOCUMENT:
      return DOCUMENT_MIMETYPE[mimetype];
    case FILE_TYPE.AUDIO:
      return AUDIO_MIMETYPE[mimetype];
    case FILE_TYPE.VIDEO:
      return VIDEO_MIMETYPE[mimetype];
    case FILE_TYPE.IMAGE:
      return IMAGE_MIMETYPE[mimetype];
  }
}
