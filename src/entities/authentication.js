/* 인증 */
import Sequelize from 'sequelize';
import sequelize from './init';

const Authentication = sequelize.define(
  'authentication',
  {
    authenticationId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    identifier: {
      type: Sequelize.TEXT,
    },
    key: {
      type: Sequelize.TEXT,
    },
    refreshToken: {
      type: Sequelize.TEXT,
    },
  },
  {
    instanceMethods: {
      toJSON: async () => {
        return this.get({ plain: true });
      },
    },
    freezeTableName: true,
    underscored: true,
  },
);

Authentication.associate = (schemas) => {
  schemas.Authentication.belongsTo(schemas.User, { foreignKey: 'userId' });
};

export default Authentication;
