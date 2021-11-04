import express from 'express';
import loaders from './loaders';
import https from 'https';
import http from 'http';

import { api as serverConfig } from '../config';

export default async function startServer() {
  let server;
  const app = express();
  const { https: httpsConfig, port, host } = serverConfig;

  await loaders(app); // Loaders initialize

  if (httpsConfig) server = https.createServer(httpsConfig, app);
  else server = http.createServer(app);

  server
    .listen(port, host, () => {
      console.log(`
        ################################################
        🛡️  Server listening on : ${host}:${port} 🛡️
        ################################################
      `);
    })
    .on('error', (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
}
