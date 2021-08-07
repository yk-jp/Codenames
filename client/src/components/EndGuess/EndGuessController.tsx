import { useContext } from 'react';
// context
import { SocketContext } from '../../context/SocketContext';
// config
import Storage from "../../config/storage";

const EndGuessController = () => {
  const { roomId, playerName } = Storage();
  // context
  const socket = useContext(SocketContext);
  const endGuessController = () => {
    socket.emit("end-guess", roomId, playerName);
  };

  return endGuessController;
};


export default EndGuessController;