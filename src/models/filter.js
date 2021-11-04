/*
isEmail: 'email',
isBoolean: 'boolean',
notEmpty: 'required',
is: 'format',
isIn: 'enum',
len: 'maxLength',
isInt: 'number',
isDate: 'date',
isOffset: 'number',
isLimit: 'number',
min: 'min',
max: 'max',
defaultValue: value,
*/
import { PLATFORM_TYPE } from '../constants/type';
export const PagingFilterModel = {
  limit: { isLimit: true, defaultValue: 10, max: 100, min: 0 },
  offset: { isOffset: true, defaultValue: 0, min: 0 },
};

export const UserFilterModel = {
  name: { allowNull: false },
  mobile: { allowNull: false },
  email: { isEmail: true, allowNull: false },
  platform: { isInt: true, isIn: PLATFORM_TYPE, allowNull: false },
  isEnabled: { isBoolean: true, allowNull: false },
  keyword: { allowNull: false },
  conferenceTitle: { allowNull: false },
};
