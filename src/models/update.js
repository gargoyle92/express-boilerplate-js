/*
is: 'format',
isIn: 'enum',
isEmail: 'email',
isBoolean: 'boolean',
notEmpty: 'required',
len: 'maxLength',
isInt: 'number',
isDate: 'date',
isOffset: 'number',
isLimit: 'number',
min: 'min',
max: 'max',
defaultValue: value,
*/
import { AUTH_TYPE, PLATFORM_TYPE } from '../constants/type';
export const AuthenticationUpdateModel = {
  authType: { allowNull: false, isIn: AUTH_TYPE },
  identifier: { allowNull: false },
  oldKey: { notEmpty: true },
  newKey: { notEmpty: true },
};

export const AuthenticationResetKeyUpdateModel = {
  authType: { allowNull: false, isIn: AUTH_TYPE },
  identifier: { allowNull: false },
};

export const AuthenticationIdentifierUpdateModel = {
  authType: { allowNull: false, isIn: AUTH_TYPE },
  identifier: { allowNull: false },
  newIdentifier: { allowNull: false },
};

export const AdminUpdateModel = {
  email: { isEmail: true, allowNull: false },
  name: { allowNull: false },
  iso: { allowNull: false },
  countryCode: { isInt: true, allowNull: false },
  mobile: { allowNull: false },
  platform: { allowNull: false, isIn: PLATFORM_TYPE },
  isEnabled: { isBoolean: true },
  ip: { allowNull: false },
};

export const UserUpdateModel = {
  email: { isEmail: true, allowNull: false },
  name: { allowNull: false },
  nickname: { allowNull: false },
  iso: { allowNull: false },
  countryCode: { isInt: true, allowNull: false },
  mobile: { allowNull: false },
  licenseNumber: { allowNull: false },
  hospital: { allowNull: false },
  department: { allowNull: false },
  memo: { allowNull: false },
  isReceiveEmail: { isBoolean: true },
  isReceiveSms: { isBoolean: true },
  isPrivacyInformation: { isBoolean: true },
  isEnabled: { isBoolean: true },
  platform: { allowNull: false },
  ip: { allowNull: false },
};
