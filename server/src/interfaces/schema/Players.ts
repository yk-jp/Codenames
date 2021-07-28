import { Model } from "sequelize";

interface PlayersAttributes {
  id: string; 
  roomId: string; //the id of the room that a player is in.
  socketId:string;
  player: string;
}

export default interface PlayersInstance extends Model<PlayersAttributes>,
  PlayersAttributes { }
