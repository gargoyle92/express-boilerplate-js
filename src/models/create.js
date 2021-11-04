/*
isEmail: 'email',
isBoolean: 'boolean',
notEmpty: 'required',
is: 'format',
isIn: 'enum',
len: 'maxLength',
isInt: 'number',
isDate: 'date',
isHour: 'hour',
isOffset: 'number',
isLimit: 'number',
min: 'min',
max: 'max',
defaultValue: value,
*/

import { AUTH_TYPE, PERMISSION_TYPE, PLATFORM_TYPE } from '../constants/type';

export const AuthenticationCreateModel = {
  identifier: { notEmpty: true },
  key: { allowNull: false },
  authType: { notEmpty: true, isIn: AUTH_TYPE },
  permission: { allowNull: false, inIn: PERMISSION_TYPE },
  scope: { allowNull: false },
  refreshToken: { allowNull: false },
  expireAt: { allowNull: false },
  session: { isBoolean: true },
  conferenceId: { isInt: true, notEmpty: true },
};

export const AdminCreateModel = {
  email: { isEmail: true, notEmpty: true },
  name: { notEmpty: true },
  iso: { allowNull: false },
  countryCode: { isInt: true, allowNull: false },
  mobile: { notEmpty: true },
  platform: { allowNull: false, isIn: PLATFORM_TYPE },
  isEnabled: { isBoolean: true },
  ip: { allowNull: false },
};

export const UserCreateModel = {
  email: { isEmail: true, notEmpty: true },
  name: { notEmpty: true },
  nickname: { allowNull: false },
  iso: { allowNull: false },
  countryCode: { isInt: true, allowNull: false },
  mobile: { notEmpty: true },
  licenseNumber: { allowNull: false },
  hospital: { allowNull: false },
  department: { allowNull: false },
  memo: { allowNull: false },
  isReceiveEmail: { isBoolean: true, allowNull: false },
  isReceiveSms: { isBoolean: true, allowNull: false },
  isPrivacyInformation: { isBoolean: true, allowNull: false },
  isEnabled: { isBoolean: true, allowNull: false },
  platform: { allowNull: false },
  ip: { allowNull: false },
};
