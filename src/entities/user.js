import Sequelize from 'sequelize';
import sequelize from './init';

const User = sequelize.define(
  'user',
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '유저 이름',
    },
    nickname: {
      type: Sequelize.STRING,
      comment: '유저 닉네임',
    },
    isEnable: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
      comment: '0:활성,1:비활성',
    },
    isDelete: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
      comment: '0:정상,1:탈퇴',
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
    timestamps: true,
    paranoid: true,
  },
);

User.associate = (schemas) => {
  schemas.User.hasOne(schemas.Authentication, { foreignKey: 'userId' });
};

export default User;
