import { Model } from "sequelize";

interface PlayersAttributes {
  id: string; //socket.id
  roomId: string; //the id of the room that a player is in.
  player: string;
}

export default interface PlayersInstance extends Model<PlayersAttributes>,
  PlayersAttributes { }
