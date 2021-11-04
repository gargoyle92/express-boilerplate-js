import path from 'path';
import Umzug from 'umzug';
import Sequelize from 'sequelize';
import sequelize from '../entities/init';

const queryInterface = sequelize.getQueryInterface();

export default async () => {
  const migrator = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: sequelize,
      modelName: 'SequelizeMeta',
      tableName: 'sequelize_migration',
    },
    migrations: {
      path: path.join(__dirname, '../migrations'),
      pattern: /^\d+[\w-]+\.js$/,
      params: [queryInterface, Sequelize],
    },
  });

  let list = await migrator.pending();
  if (list.length > 0) {
    console.log('-- Database Migrator Initialize.');
    for (let item of list) {
      await migrator.up(item.file);
    }
  }
};
