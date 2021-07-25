import IPlayer from "./IPlayer";
import ITeam from "./ITeam";
import ICard from "./ICard";

export default interface ITable {
  players: IPlayer[];
  redTeam:ITeam;
  blueTeam:ITeam;
  phase:string;
  cards:ICard[];
}


