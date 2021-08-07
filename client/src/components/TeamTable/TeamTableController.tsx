import { useContext } from 'react';
// config
import Storage from '../../config/storage';
//interfaces
import ISpymaster from '../../interfaces/ISpymaster';
import IOperative from '../../interfaces/IOperative';
// useContext
import { SocketContext } from '../../context/SocketContext';

const TeamTableController = () => {
  const { playerId, roomId } = Storage();
  const socket = useContext(SocketContext);

  const kickPlayer = (player: ISpymaster | IOperative) => {
    if (player.id === playerId) return; //If the id clicked by player is own id, do nothing.
    if (window.confirm(`KICK ${player.name} OUT OF THIS GAME?`)) {
      socket.emit("leave-room", roomId, player.id);
    }
  };
  
  return {kickPlayer};
};

export default TeamTableController;