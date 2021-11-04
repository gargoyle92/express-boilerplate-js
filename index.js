'use strict';

// Entry point of the application
if (process.env.NODE_ENV === 'production') {
  console.log(`-- START PORUDCTION BUILD --`);
  require('./dist')
    .default()
    .then(() => {})
    .catch(e => {
      console.error(e.stack);
      process.exit(1);
    });
} else {
  console.log(`-- START DEVELOPMENT BUILD --`);
  require('babel-register');
  require('./src')
    .default()
    .then(() => {})
    .catch(e => {
      console.error(e.stack);
      process.exit(1);
    });
}
