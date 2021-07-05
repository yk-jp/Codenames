import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// socket.io
import { io } from "socket.io-client";
//others
import config from '../config/config';
import { v4 as uuidv4 } from 'uuid';

const Home: FC = (): JSX.Element => {
  const [roomId, setRoomId] = useState<string>();
  
  useEffect(() => {
    setRoomId(uuidv4()); // generate a roomId
    const home = io(config.server.home);
  }, []);

  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center flex-column align-items-center h-75">
        <div>
          <Link to={`/game?room=${roomId}`}>
            <button type="button" className="btn btn-outline-success">CREATE ROOM</button>
          </Link>
        </div>
      </div>
    </div >
  );
}

export default Home;