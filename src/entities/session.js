import Sequelize from 'sequelize';
import sequelize from './init';

export default sequelize.define(
  'session',
  {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    expires: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    data: Sequelize.TEXT,
    userId: Sequelize.INTEGER,
    adminId: Sequelize.INTEGER,
  },
  {
    freezeTableName: true,
    underscored: true,
  },
);
