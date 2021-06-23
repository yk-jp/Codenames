import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// socket.io
import { io } from "socket.io-client";
//hook
import handleEvent from '../hooks/handleEvent';
//others
import config from '../config/config';
import { v4 as uuidv4 } from 'uuid';


const Home: FC = (): JSX.Element => {

  const [roomId, setRoomId] = useState(""); //The id to get in the invited room.

  useEffect(() => {
    const home = io(config.home);
    setRoomId(uuidv4());
  }, []);

  return (
    <div className="container h-100">

      <div className="d-flex justify-content-center flex-column align-items-center h-75">`

        <div>
          <Link to={`/lobby/${roomId}`}>
            <button type="button" className="btn btn-outline-success">CREATE ROOM</button>
          </Link>
        </div>
      </div>
    </div >
  );
}

export default Home;