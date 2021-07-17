import IPlayer from "./IPlayer";
import ISpymaster from "./ISpymaster";
import IOperative from "./IOperative";
import ITeam from "./ITeam";
import ICard from "./ICard";
export default interface ITable {
  players: (ISpymaster | IOperative)[];
  redTeam:ITeam;
  blueTeam:ITeam;
  phase:string;
  cards:ICard[];
}


