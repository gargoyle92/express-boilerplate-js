import validator from 'validator';
import Utility from '../utils/utility';
import { VALIDATION_TYPE, DATA_TYPE } from '../constants/type';

export function normalizeValidation(key, validation) {
  if (validation.value) return validation;
  return { key: VALIDATION_TYPE[key], value: validation };
}

const BOOLEAN_TRUE_TABLE = ['Y', 'true', 'yes', '1', true, 1];
const BOOLEAN_FALSE_TABLE = ['N', 'false', 'no', '0', false, 0];
const BOOLEAN_TABLE = BOOLEAN_TRUE_TABLE.concat(BOOLEAN_FALSE_TABLE);

function runValidation(key, args, value) {
  alue = value == null ? value : Utility.getType(value) == DATA_TYPE.ARRAY ? value : String(value);
  switch (key) {
    case 'is':
      if (value != null && !validator.matches(value, args.value)) return args.key;
      break;
    case 'isIn':
      const type = Utility.getType(args.value);
      if (!Utility.isEmpty(value)) {
        if (type == DATA_TYPE.ARRAY && !validator.isIn(value, args.value)) return args.key;
        else if (type == DATA_TYPE.OBJECT && !Utility.isInclude(args.value, value)) return args.key;
      }
      break;
    case 'isInt':
      if (value != null && !validator.isInt(value)) return args.key;
      break;
    case 'isURL':
      if (value != null && !validator.isURL(value)) return args.key;
      break;
    case 'isEmail':
      if (value != null && !validator.isEmail(value)) return args.key;
      break;
    case 'isNumber':
      if (value != null && !validator.isNumeric(value)) return args.key;
      break;
    case 'isDecimal':
      if (value != null && !validator.isDecimal(value)) return args.key;
      break;
    case 'isFloat':
      if (value != null && !validator.isFloat(value)) return args.key;
      break;
    case 'isDouble':
      if (value != null && !validator.isFloat(value)) return args.key;
      break;
    case 'isDate':
      if (value != null && new Date(clearValue(value)) == 'Invalid Date') return args.key;
      break;
    case 'isHour':
      if (value != null && !Utility.isHourString(value)) return args.key;
      break;
    case 'isArray':
      if (value != null && !Array.isArray(value)) return args.key;
      break;
    case 'isBoolean':
      if (value != null && BOOLEAN_TABLE.indexOf(value) === -1) return args.key;
      break;
    case 'isInclude':
      if (value != null && BOOLEAN_TABLE.indexOf(value) === -1) return args.key;
      break;
    case 'isLimit':
      if (value != null && !validator.isInt(value)) return args.key;
      break;
    case 'isOffset':
      if (value != null && !validator.isInt(value)) return args.key;
      break;
    case 'allowNull':
      if (args.value === false) if (value === null) return args.key;
      break;
    case 'notIn':
      if (value != null && validator.isIn(value, args.value)) return args.key;
      if (typeof value === 'string' && validator.isIn(value.toLowerCase(), args.value)) return args.key;
      break;
    case 'notEmpty':
      if (value == null || validator.isEmpty(value)) return args.key;
      break;
    case 'len': {
      const [min, max] = args.value;
      if (value != null && !validator.isLength(value, min, max)) return args.key;
      break;
    }
    case 'min': {
      const number = parseFloat(value);
      if (!isNaN(number) && number < args.value) return args.key;
      break;
    }
    case 'max': {
      const number = parseFloat(value);
      if (!isNaN(number) && number > args.value) return args.key;
      break;
    }
  }
  return null;
}

// Run validations from the data
function clearValue(value) {
  return value.replace(/\"/g, '');
}

// Run validation, return only one error.
export function validateSingle(data, schema) {
  let result = validate(data, schema);
  for (let key in result) {
    if (result[key] !== false) return { field: key, type: result[key] };
  }
  return null;
}

export function sanitize(data, schema, returnKey) {
  // It converts strings to numbers if possible, that's all.
  let newData = {};

  for (let key in schema) {
    let validation = schema[key];
    if (validation.defaultValue != null) newData[key] = validation.defaultValue;
    if (validation.isIn) {
      let isIn = false;
      for (let key2 in validation.isIn) {
        if (validation.isIn[key2] == data[key]) {
          isIn = true;
          break;
        }
      }
      if (!isIn) continue;
    } else {
      if (Utility.isEmpty(data[key])) continue;
    }
    if (validation.isInt) newData[key] = parseInt(data[key]);
    else if (validation.isFloat != null) newData[key] = parseFloat(data[key]);
    else if (validation.isDouble != null) newData[key] = parseFloat(data[key]);
    else if (validation.isNumber != null) newData[key] = Number(data[key]);
    else if (validation.isBoolean != null) newData[key] = BOOLEAN_TRUE_TABLE.indexOf(data[key]) !== -1;
    else if (validation.isDate != null) newData[key] = new Date(clearValue(data[key]));
    else if (validation.isLimit != null) newData[key] = parseInt(data[key]);
    else if (validation.isOffset != null) newData[key] = newData.limit * parseInt(data[key]);
    else if (validation.isArray != null) newData[key] = arrayValidate(data[key]);
    else if (validation.isInclude != null && validation.include != null) {
      if (BOOLEAN_TRUE_TABLE.indexOf(data[key]) !== -1) {
        if (Utility.getType(newData) != DATA_TYPE.ARRAY) newData = new Array();
        newData.push(validation.include);
      }
    } else newData[key] = data[key];
  }
  return returnKey && !Utility.isEmpty(newData) ? { [returnKey]: newData } : newData;
}

function arrayValidate(arr) {
  const validateData = arr.map((data) => {
    const type = Utility.getType(data);

    if (type == DATA_TYPE.OBJECT) data = JSON.parse(JSON.stringify(data));
    return data;
  });

  return validateData;
}

// Run validations from the data
export default function validate(data, schema, detailed = false) {
  if (schema == null) return {};
  let errors = {};
  for (let key in schema) {
    let validation = schema[key];
    let value = data[key];
    for (let check in validation) {
      if (validation[check] == null) continue;
      let args = normalizeValidation(check, validation[check]);
      const result = runValidation(check, args, value);
      if (result !== null) {
        if (detailed) errors[key] = { name: result, value: args.value };
        else errors[key] = result;
      }
    }
  }
  return errors;
}
