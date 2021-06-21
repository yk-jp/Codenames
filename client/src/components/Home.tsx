import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// socket.io
import { io } from "socket.io-client";
import config from '../config/config';
//hook
import handleEvent from '../hooks/handleEvent';


const Home: FC = (): JSX.Element => {
  const [room, setRoom] = useState<string>(""); //The id to get in the invited room.

  useEffect(() => {
    const socket = io(config.endpoint);
    socket.on("hello", (msg) => {
      console.log(`received${msg} from the server`);
    });
  }, []);

  return (
    <div className="container h-100">

      <div className="d-flex justify-content-center flex-column align-items-center h-75">

        <div>
          <Link to={`/lobby?room=`}>
            <button type="button" className="btn btn-outline-success">CREATE ROOM</button>
          </Link>
        </div>

        <div className="m-4">
          <h6 className="mt-2">OR</h6>
        </div>

        <div className="d-flex">
          <input type="text" className="h-100" placeholder="ENTER INVITE CODE" onChange={(e => setRoom(e.target.value))} />
          <Link onClick={(e) => handleEvent(e, room)} to={`/lobby?room=${room}`}>
            <button type="submit" className="btn btn-outline-success">JOIN</button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Home;