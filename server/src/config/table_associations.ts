import Tables from "../models/schema/Tables";
import RoomIds from "../models/schema/RoomIds";
import Players from "../models/schema/Players";

/*
  foreignKey = foreignKey of tables model 
  targetKey = the key in the column of RoomIds model that link to foreignKey
*/

Tables.belongsTo(RoomIds, { foreignKey: "roomId", targetKey: "roomId", onDelete: 'cascade' });
RoomIds.hasOne(Tables);

