import { useEffect, useState, useContext } from 'react';
import Storage from '../../config/storage';
// context
import { SocketContext } from '../../context/SocketContext';
import { GameDataContext } from '../../context/GameDataContext';

const ShuffleController = () => {
  const { roomId } = Storage();
  // context
  const socket = useContext(SocketContext);
  const { tableData } = useContext(GameDataContext);
  // useState
  const [isShuffleDisabled, setIsShuffleDisabled] = useState<boolean>(false);

  const shuffleStyleContoller = () => {
    if (tableData.table.status === "PLAYING") setIsShuffleDisabled(true);
    else setIsShuffleDisabled(false);
  };

  const shuffleMembersController = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (window.confirm("SHUFFLE MEMBERS ?")) socket.emit("shuffle-members", roomId);
    else e.preventDefault();
  }

  useEffect(() => {
    // style for shuffle button 
    shuffleStyleContoller();
  }, [tableData.table]);

  return { isShuffleDisabled, shuffleMembersController };
};

export default ShuffleController;