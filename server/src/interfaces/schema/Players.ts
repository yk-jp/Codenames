import { Model } from "sequelize";

interface PlayersAttributes {
  id: string; //socket.id
  name: string;
}

export default interface PlayersInstance extends Model<PlayersAttributes>,
  PlayersAttributes { }
