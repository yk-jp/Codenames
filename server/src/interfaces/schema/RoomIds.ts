import { Model } from "sequelize";

// These are all the attributes in the En_words model
interface RoomIdsAttributes {
  roomId: string;
}

export default interface RoomIdsInstance extends Model<RoomIdsAttributes>,
RoomIdsAttributes { }
