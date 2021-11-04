import { createReadStream } from 'fs';
import { ncloud as ncloudConfig } from '../../config';
import AWS from 'aws-sdk';
import fs from 'fs';
import CryptoJS from 'crypto-js';
import AxiosUtility from './axios';

const endpoint = new AWS.Endpoint(ncloudConfig.objectStorage.endpoint);
const region = ncloudConfig.objectStorage.region;
const access_key = ncloudConfig.objectStorage.accessKeyId;
const secret_key = ncloudConfig.objectStorage.secretAccessKey;

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
});

const bucket_name = ncloudConfig.objectStorage.bucket;
function getPublicUrlHttp(endpoint, bucket, key) {
  let result = `${endpoint}/${bucket}/${encodeSpecialCharacters(key)}`;
  return result;
}

function encodeSpecialCharacters(filename) {
  return encodeURI(filename).replace(/[!'()* ]/g, function (char) {
    return '%' + char.charCodeAt(0).toString(16);
  });
}

function createMessage(to, subject, content) {
  return { to: to, subject: subject, content: content };
}

export default class NcloudUtility {
  static async objectStorageFileUploader(key, path) {
    return new Promise((resolve, reject) => {
      S3.putObject(
        {
          Bucket: bucket_name,
          Key: key,
        },
        (err, data) => {
          if (err) return reject(err);
        },
      );

      S3.putObject(
        {
          Bucket: bucket_name,
          Key: key,
          ACL: 'public-read',
          // ACL을 지우면 전체공개가 되지 않습니다.
          Body: createReadStream(path),
        },
        (err, data) => {
          if (err) return reject(err);

          fs.unlink(path, (err) => {
            if (err) console.error(err);
          });

          console.log('Uploaded ' + key);
        },
      );
      resolve(getPublicUrlHttp(ncloudConfig.objectStorage.endpoint, bucket_name, key));
    });
  }

  static async makeSignature(httpMethod, url) {
    const space = ' '; // one space
    const newLine = '\n'; // new line
    const method = httpMethod; // method
    const urlPath = url; // url (include query string)
    const timestamp = new Date().getTime().toString(); // current timestamp (epoch)
    const accessKey = ncloudConfig.accessKey; // access key id (from portal or Sub Account)
    const secretKey = ncloudConfig.secretKey; // secret key (from portal or Sub Account)

    let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(urlPath);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    let hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  }

  static async sendSMS(smsType, contentType, countryCode, subject = null, content = null, messageArr = [], reserveTime = null, scheduleCode = null) {
    const from = ncloudConfig.sms.sendNumber;
    const smsUrl = `https://sens.apigw.ntruss.com`;
    const pathUrl = `/sms/v2/services/${ncloudConfig.sms.serviceId}/messages`;
    const headers = {
      'x-ncp-apigw-timestamp': new Date().getTime(),
      'x-ncp-iam-access-key': ncloudConfig.accessKey,
      'x-ncp-apigw-signature-v2': await this.makeSignature('POST', pathUrl),
    };

    if (messageArr.length > 0) {
      const sms = {
        type: smsType,
        contentType: contentType,
        countryCode: countryCode,
        from: from,
        subject: subject,
        content: content,
        reserveTime: reserveTime,
        scheduleCode: scheduleCode,
        messages: messageArr.map((message) => createMessage(message.to, message.subject, message.content)),
      };
      return await AxiosUtility.post(smsUrl + pathUrl, sms, headers);
    }

    return null;
  }

  static async resultSMS(requestId) {
    const smsUrl = `https://sens.apigw.ntruss.com`;
    const pathUrl = `/sms/v2/services/${ncloudConfig.sms.serviceId}/messages?requestId=${requestId}`;
    const headers = {
      'x-ncp-apigw-timestamp': new Date().getTime(),
      'x-ncp-iam-access-key': ncloudConfig.accessKey,
      'x-ncp-apigw-signature-v2': await this.makeSignature('GET', pathUrl),
    };

    return await AxiosUtility.get(smsUrl + pathUrl, null, headers);
  }
}
