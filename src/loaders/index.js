import sequelizeLoader from './sequelize';
import expressLoader from './express';
import migrationLoader from './migration';
import seederLoader from './seeder';
import loggerLoader from './logger';
import middlewareLoader from './middleware';
import routeLoader from './route';

export default async (app) => {
  await sequelizeLoader();
  console.log('-- Sequelize Loaded.');

  await migrationLoader();
  console.log('-- Migrations Loaded.');

  await seederLoader();
  console.log('-- Seeders Loaded.');

  await middlewareLoader(app);
  console.log('-- Middlewares Loaded.');

  await loggerLoader(app);
  console.log('-- Loggers Loaded.');

  await routeLoader(app);
  console.log('-- Routes Loaded.');

  await expressLoader(app);
  console.log('-- Express Loaded.');
};
