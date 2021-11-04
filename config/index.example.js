'use strict';

const path = require('path');

module.exports = {
  api: {
    host: 'localhost',
    port: 3000,
    prefix: '/api',
  },
  db: {
    host: '',
    user: '',
    password: '',
    dialect: 'mysql',
    uri: 'mysql://id:pw@url:port/dbname',
  },
  log: {
    stdout: 'dev',
    access: {
      directory: 'logs',
      filename: 'access.log',
      format: 'combined',
    },
  },
  auth: {
    sessionSecret: 'pen_pineapple!authentication@protocol@@',
    bcrypt: 10,
    deleteKey: '###',
  },
  upload: {
    directory: 'uploads',
    directoryPublic: '/uploads',
    url: 'https://api.estickerapp.com',
    temp: '/tmp/',
  },
  firebase: {
    credential: require('./firebase.json'),
    databaseURL: 'https://somewhere.com',
    // Firebase Cloud Messaging Key
    fcmKey: '...',
  },
  sms: {
    userId: '...',
    secureKey: '...',
    testFlag: 'Y',
    sendPhone: '010-0000-0000',
  },
  payment: path.resolve(__dirname, 'payment.json'),
  lounge: {
    average: 6,
    count: 3,
    time: 10 * 60 * 1000,
  },
  suggestion: {
    count: 5,
    expire: 4 * 24 * 60 * 60 * 1000,
    target: 7 * 24 * 60 * 60 * 1000,
  },
  iap: {
    googlePublicKeyPath: __dirname,
  },
  appVersion: {
    android: 'com.estickerapp.android',
  },
  s3: {
    enabled: true,
    bucket: '###',
    accessKeyId: '###',
    secretAccessKey: '###',
    signatureVersion: 'v4',
    region: 'ap-northeast-2',
  },
};

// To use in Docker environment, you can specify config folder in environment
// variable.
if (process.env.CONFIG_PATH != null) {
  module.exports = require(path.resolve(__dirname, process.env.CONFIG_PATH));
}
