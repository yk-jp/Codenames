import ISpymaster from "./ISpymaster";
import IOperative from "./IOperative";
import ITable from "./ITable";
import { Dispatch } from 'react';

interface ITableData {
  table: ITable | null;
  setTable: Dispatch<ITable | null>;
}

interface IPlayerData {
  player: ISpymaster | IOperative | null;
  setPlayer: Dispatch<ISpymaster | IOperative | null>;
}

export default interface IGameData {
  tableData: ITableData;
  playerData: IPlayerData;
}