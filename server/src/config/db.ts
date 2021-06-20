import config from './config';
import { Sequelize, DataTypes } from 'sequelize';

const db = new Sequelize(config.db.name, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql'
});

export default db;
