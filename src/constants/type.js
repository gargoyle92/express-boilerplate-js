export const DATA_TYPE = {
  STRING: 'String',
  NUMBER: 'Number',
  BOOLEAN: 'Boolean',
  UNDEFINED: 'Undefined',
  NULL: 'Null',
  OBJECT: 'Object',
  ARRAY: 'Array',
  REGEXP: 'Regexp',
  MATH: 'Math',
  DATE: 'Date',
  FUNCTION: 'Function',
};

export const VALIDATION_TYPE = {
  isEmail: 'email',
  isBoolean: 'boolean',
  notEmpty: 'required',
  is: 'format',
  isIn: 'enum',
  len: 'maxLength',
  isInt: 'number',
  isDate: 'date',
  min: 'min',
  max: 'max',
};

export const FILE_TYPE = {
  DOCUMENT: 'document',
  AUDIO: 'audio',
  VIDEO: 'video',
  IMAGE: 'image',
};

export const FILE_DIRECTORY_TYPE = {};

export const PERMISSION_TYPE = {
  USER: '0',
  ADMIN: '1',
  SUPER_ADMIN: '2',
  DEVELOPER: '3',
};
export const PLATFORM_TYPE = {
  ANDROID: '0',
  iOS: '1',
  WEB: '2',
  ADMIN: '3',
};

export const AUTH_TYPE = {
  LOCAL: 'local',
  EMAIL: 'email',
  TWITTER: 'twitter',
  GOOGLE: 'google',
  APPLE: 'apple',
  KAKAKO: 'kakao',
  NAVER: 'naver',
  LINE: 'line',
  BAND: 'band',
  FACEBOOK: 'facebook',
};

export const USER_LOG_TYPE = {
  SIGN_UP: 'signUp',
  SIGN_IN: 'signIn',
  SIGN_OUT: 'signOut',
  SESSION_IN: 'sessionIn',
  SESSION_OUT: 'sessionOut',
};
