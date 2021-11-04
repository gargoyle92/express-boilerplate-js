import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export default async (app) => {
  // app.set('view engine', 'pug');
  // app.set('views', path.resolve(__dirname, 'templates'));
  app.set('query parser', 'simple');
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  app.use('/docs', express.static(path.resolve(__dirname, '../apidoc')));

  if (process.env.NODE_ENV !== 'production') {
    // Use CORS in development mode
    app.use(
      cors({
        origin: (_, callback) => callback(null, true),
        credentials: true,
      }),
    );
  } else {
    // Use CORS in production mode
    app.use(
      cors({
        origin: ['http://localhost:3000', 'http://localhost:8080'],
        credentials: true,
      }),
    );
  }
  app.use(cookieParser());
};
