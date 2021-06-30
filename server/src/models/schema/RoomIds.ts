import db from '../../config/db';
import RoomIdsInstance from '../../interfaces/schema/RoomIds';
import { Sequelize, DataTypes } from "sequelize";
import Tables from './Tables';
const RoomIds = db.define<RoomIdsInstance>('RoomIds', {
  roomId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull:false,
    validate: {
      notEmpty: true
    }
  },
},
  {
    tableName: 'roomIds',
    timestamps: false // avoid adding createdAt,updatedAt columns automatically
  });

export default RoomIds;