import { FC, useContext } from 'react';
// context
import { SocketContext } from '../../context/SocketContext';

const EndGuess: FC = (): JSX.Element => {
  // context
  const socket = useContext(SocketContext);
  // others
  const roomId: string = window.location.pathname.split("/").pop() as string;
  const playerName: string = sessionStorage.getItem("playerName") as string;

  const endGuessController = () => {
    socket.emit("end-guess", roomId,playerName);
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <button type="button" className="btn btn-outline-success" onClick={endGuessController}>END GUESS</button>
    </div>
  );
};

export default EndGuess;