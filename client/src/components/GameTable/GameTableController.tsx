import { useEffect, useContext } from 'react';
// context
import { SocketContext } from '../../context/SocketContext';

const GameTableController = () => {
  // context
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("alert-message", (message: string) => {
      alert(message);
    });
    return () => {
      socket.off("alert-message");
    };
  }, [socket]);
};

export default GameTableController;