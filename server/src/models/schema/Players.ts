import db from '../../config/db';
import PlayersInstance from '../../interfaces/schema/Players';
import { Sequelize, DataTypes } from "sequelize";

const Players = db.define<PlayersInstance>('Players', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false,
    validate: {
      notEmpty: true
    }
  },
  roomId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique:true,
    validate: {
      notEmpty: true
    }
  },
  player: {
    type: DataTypes.TEXT,
    allowNull:false,
    validate: {
      notEmpty: true
    }
  }
},
  {
    tableName: 'players',
    timestamps: false // avoid adding createdAt,updatedAt columns automatically
  });

export default Players;