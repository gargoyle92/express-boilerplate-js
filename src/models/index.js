import fs from 'fs';
import path from 'path';

let models = {};
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') != 0 && file != 'index.js')
  .forEach((file) => {
    let model = require(path.join(__dirname, file));
    models = Object.assign({}, models, model);
  });

module.exports = models;
