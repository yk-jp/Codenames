import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//socket.io
import { io } from "socket.io-client";
//hooks
import handleEvent from '../hooks/handleEvent';
import getQueryParams from '../hooks/getQueryParams';
// others
import config from '../config/config';

const Room: FC<string> = (): JSX.Element => {
  const link: string = window.location.toString();
  const [playerName, setPlayerName] = useState<string>("");

  useEffect(() => {
    const lobby = io(config.lobby);
    const roomId: string = getQueryParams();
    lobby.emit("create-room", roomId);
    lobby.on("joined-in", (id: number) => {
      console.log("new player joined in ", id);
    })
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center mt-5">
        {/* name */}
        <div className="name d-flex flex-column">
          <div className="d-flex justify-content-center p-5">
            <input id="playerName" type="text" className="my-3 text-center" name="name" placeholder="ENTER YOUR NAME" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
          </div>
          {/* Start game */}
          <div className="d-flex justify-content-center">
            <Link to="/game">
              <button type="submit" className="btn btn-outline-success" onClick={(e) => handleEvent(e, playerName)}>JOIN ROOM</button>
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Room;