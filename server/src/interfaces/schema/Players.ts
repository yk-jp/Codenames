import { Model } from "sequelize";

interface PlayersAttributes {
  id: string; //socket.id
  name: string;
  roomId:string; //the id of the room that a player is in.
}

export default interface PlayersInstance extends Model<PlayersAttributes>,
  PlayersAttributes { }
