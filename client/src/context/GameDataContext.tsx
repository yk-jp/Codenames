import { useState, createContext } from 'react';
import IGameData from '../interfaces/IGameData';
import ITable from '../interfaces/ITable';
import IOperative from '../interfaces/IOperative';
import ISpymaster from '../interfaces/ISpymaster';

export const GameDataContext = createContext<IGameData | any>({});

export const GameDataProvider = ({ children }): JSX.Element => {
  const [table, setTable] = useState<ITable | null>(null);
  const [player, setPlayer] = useState<ISpymaster | IOperative | null>(null);

  const gameData: IGameData = {
    tableData: {
      table: table,
      setTable: setTable
    },
    playerData: {
      player: player,
      setPlayer: setPlayer
    },
  }

  return (
    <GameDataContext.Provider value={gameData}>
      {children}
    </GameDataContext.Provider>
  );
}