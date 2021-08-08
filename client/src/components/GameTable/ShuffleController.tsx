import { useEffect, useState, useContext } from 'react';
// config
import Storage from '../../config/storage';
import Message from '../../config/Message';
import Term from '../../config/Term';
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
    if (tableData.table.status === Term.GameStatus.PLAYING) setIsShuffleDisabled(true);
    else setIsShuffleDisabled(false);
  };

  const shuffleMembersController = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (window.confirm(Message.Confirm.shuffleMembers)) socket.emit("shuffle-members", roomId);
    else e.preventDefault();
  }

  useEffect(() => {
    // style for shuffle button 
    shuffleStyleContoller();
  }, [tableData.table]);

  return { isShuffleDisabled, shuffleMembersController };
};

export default ShuffleController;