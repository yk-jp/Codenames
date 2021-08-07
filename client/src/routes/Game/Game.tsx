import { useContext } from 'react';
//component
import GameTable from '../../components/GameTable/GameTable';
import Loading from '../../components/Loading/Loading';
// context
import { GameDataContext } from '../../context/GameDataContext';
//controller 
import GameController from './GameController';

const Game = (): JSX.Element => {
  const { isLoggedIn, isLoading } = GameController();
  const { tableData, playerData } = useContext(GameDataContext);

  return (
    <>
      {(isLoading || !isLoggedIn) && <Loading />}
      {(tableData.table && playerData.player) && <GameTable />}
    </>
  );
};

export default Game;