import { Sequelize } from 'sequelize';
import { db } from '../../config/index';

export default new Sequelize(db.database, db.username, db.password, db);

console.log('-- Sequelize Initialized.');
