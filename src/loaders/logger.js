import mkdirp from 'mkdirp';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { log } from '../../config/index';
export default async (app) => {
  if (log.out != null) {
    app.use(morgan(log.out));
  }

  // Set up access logger
  if (log.access != null) {
    let options = log.access;
    mkdirp.sync(path.resolve(__dirname, '../../', options.directory));
    let stream = fs.createWriteStream(path.resolve(__dirname, '../../', options.directory, options.filename), { flags: 'a' });

    app.use(morgan(options.format, { stream }));
  }
};
