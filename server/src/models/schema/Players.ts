import db from '../../config/db';
import PlayersInstance from '../../interfaces/schema/Players';
import { Sequelize, DataTypes } from "sequelize";

const Players = db.define<PlayersInstance>('Players', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  roomId: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
},
  {
    tableName: 'players',
    timestamps: false // avoid adding createdAt,updatedAt columns automatically
  });

export default Players;