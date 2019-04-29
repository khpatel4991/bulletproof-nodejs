import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import * as express from 'express';
import * as fastify from 'fastify';

async function startServer() {
  const app = express();
  const fapp = fastify();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require('./loaders').default({ expressApp: app }, fapp);

  fapp.listen(config.port + 1, err => {
    if (err) {
      console.log(err);
      process.exit(1);
      return;
    }
    console.log('################################################');
    console.log(
      ' 🛡️  Fastify Server listening on port: ',
      config.port + 1,
      ' 🛡️ '
    );
    console.log('################################################');
  });

  app.listen(config.port, err => {
    if (err) {
      console.log(err);
      process.exit(1);
      return;
    }
    console.log('################################################');
    console.log(' 🛡️  Server listening on port: ', config.port, ' 🛡️ ');
    console.log('################################################');
  });
}

startServer();
