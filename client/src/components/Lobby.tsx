import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//components
import TeamTable from './TeamTable';
//socket.io
import { io } from "socket.io-client";
//hooks
import handleEvent from '../hooks/handleEvent';
import getQueryParams from '../hooks/getQueryParams';
import copyInputData from '../hooks/copyInputData';
// others
import config from '../config/config';
import { blueTeamStyle, redTeamStyle } from '../css/teamTableStyle';


const Lobby: FC<string> = (): JSX.Element => {
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
    <div className="container h-100">
      <div className="d-flex justify-content-center flex-column mt-5">
        {/* name */}
        <div className="offset-2">
          <h5>NAME</h5>
        </div>
        <div className="offset-2 col-8">
          <input id="playerName" type="text" className="name-field w-100" name="name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
        </div>

        {/* invite code */}
        <div className="offset-2 mt-4">
          <h5>SEND THE CODE TO FRIENDS</h5>
        </div>
        <div className="offset-2 col-8 d-flex">
          <input id={link} type="text" className="name-field" name="link" value={link} readOnly />
          <button type="button" className="btn btn-outline-success" onClick={() => copyInputData(link)}>Copy</button>
        </div>

        {/* teams */}
        <div className="m-4">
          <h5 className="text-center">TEAMS</h5>
        </div>
        <div id="teams" className="offset-2 row col-8">
          <TeamTable table={blueTeamStyle} />
          <TeamTable table={redTeamStyle} />
        </div>

        {/* NOTE */}

        <div className="m-4 pt-4 d-flex justify-content-center">
          <h5 className="text-center">IF TOTAL NUMBER OF PLAYERS ARE 4 TO 10, CLICK "START GAME"</h5>
        </div>

        {/* Start game */}
        <div className="m-4 d-flex justify-content-center ">
          <Link to="/game">
            <button type="submit" className="btn btn-outline-success" onClick={(e) => handleEvent(e, playerName)}>START GAME</button>
          </Link>
        </div>
      </div>
    </div >
  );
}

export default Lobby;