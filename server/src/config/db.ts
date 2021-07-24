import config from './config';
import { Sequelize } from 'sequelize';

const db = new Sequelize(config.db.name, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',
  omitNull: true //for the auto increment
});

export default db;
