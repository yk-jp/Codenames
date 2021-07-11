import db from '../../config/db';
import { Sequelize, DataTypes } from "sequelize";
import session from 'express-session';
// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

db.define("Session", {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  playerId: DataTypes.STRING,
  expires: DataTypes.DATE,
  data: DataTypes.TEXT,
}, {
  tableName: 'sessions',
  timestamps: false
});

function extendDefaultFields(defaults: any, session: any) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    playerId: session.playerId,
  };
}

const sessionStore = new SequelizeStore({
  db: db,
  table: "Session",
  extendDefaultFields: extendDefaultFields,
});

export default sessionStore;