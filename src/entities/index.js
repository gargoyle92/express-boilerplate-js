import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import sequelize from './init';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

let schemas = {};
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') != 0 && file != 'index.js' && file != 'init.js')
  .forEach((file) => {
    const schema = require(path.join(__dirname, file)).default;
    schemas[capitalize(schema.name)] = schema;
  });

schemas.sequelize = sequelize;
schemas.Sequelize = Sequelize;

Object.keys(schemas).forEach((modelName) => {
  if ('associate' in schemas[modelName]) {
    schemas[modelName].associate(schemas);
  }
});

module.exports = schemas;
