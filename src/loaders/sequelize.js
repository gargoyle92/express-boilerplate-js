import { sequelize } from '../entities';

export default async () => {
  await sequelize.sync();
};
