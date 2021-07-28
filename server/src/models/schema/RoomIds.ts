import db from '../../config/db';
import RoomIdsInstance from '../../interfaces/schema/RoomIds';
import { DataTypes } from "sequelize";
import Tables from './Tables';
import Players from "./Players";
const RoomIds = db.define<RoomIdsInstance>('RoomIds', {
  roomId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
},
  {
    tableName: 'roomIds',
    updatedAt:false,
    createdAt:true//use it for scheduling jobs
  });

/*
  foreignKey = foreignKey of tables model 
  targetKey = the key in the column of RoomIds model that link to foreignKey
*/

Tables.belongsTo(RoomIds, { foreignKey: "roomId", targetKey: "roomId", onDelete: 'cascade' });
RoomIds.hasOne(Tables);

Players.belongsTo(RoomIds, { foreignKey: "roomId", targetKey: "roomId", onDelete: 'cascade' });
RoomIds.hasMany(Players);


export default RoomIds;