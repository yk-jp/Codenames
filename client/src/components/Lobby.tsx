import { FC } from 'react';
import { Link } from 'react-router-dom';
//components
import TeamTable from './TeamTable';
// interfaces
import ITable from '../interfaces/ITable';

const Lobby: FC = (): JSX.Element => {
  // table props
  const blueTeamProps: ITable["table"] = {
    id: "blue",
    style: "table text-primary border border-primary",
    team: "BLUE"
  };

  const redTeamProps: ITable["table"] = {
    id: "red",
    style: "table text-danger border border-danger",
    team: "RED"
  };

  // const blueTeamProps: ITable = 
  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center flex-column mt-5">
        {/* name */}
        <div className="offset-2">
          <h5>NAME</h5>
        </div>
        <div className="offset-2 col-8">
          <input type="text" className="name-field w-100" name="name" />
        </div>

        {/* invite code */}
        <div className="offset-2 mt-4">
          <h5>INVITE FRIENDS</h5>
        </div>
        <div className="offset-2 col-8">
          <input type="text" className="name-field w-100" name="inviteCode" />
        </div>

        {/* teams */}
        <div className="m-4">
          <h5 className="text-center">TEAMS</h5>
        </div>
        <div id="teams" className="offset-2 row col-8">
          <TeamTable table={blueTeamProps} />
          <TeamTable table={redTeamProps} />
        </div>

        {/* NOTE */}

        <div className="m-4 pt-4 d-flex justify-content-center">
          <h5 className="text-center">IF TOTAL NUMBER OF PLAYERS ARE 4 TO 10, CLICK "START GAME"</h5>
        </div>

        {/* Start game */}
        <div className="m-4 d-flex justify-content-center ">
          <Link to="/game">
            <button type="button" className="btn btn-outline-success">START GAME</button>
          </Link>
        </div>
      </div>
    </div >
  );
}

export default Lobby;