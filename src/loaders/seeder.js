import path from 'path';
import Umzug from 'umzug';
import Sequelize from 'sequelize';
import sequelize from '../entities/init';

const queryInterface = sequelize.getQueryInterface();

// pending -> 보류중인 마이그레이션 모두 가져오기
// executed -> 실행된 마이그레이션 모두 가져오기
// up -> 보류중인 마이그레이션 모두 실행하기
export default async () => {
  const seeder = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: sequelize,
      modelName: 'SequelizeSeeder',
      tableName: 'sequelize_seeder',
    },
    migrations: {
      path: path.join(__dirname, '../seeders'),
      pattern: /^\d+[\w-]+\.js$/,
      params: [queryInterface, Sequelize],
    },
  });

  let list = await seeder.pending();
  if (list.length > 0) {
    console.log('-- Database Seeder Initialize.');
    for (let item of list) {
      await seeder.up(item.file);
    }
  }
};
