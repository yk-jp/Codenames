import { FC } from 'react';
//components
import TeamTable from './TeamTable';
// interfaces
import ITable from '../interfaces/ITable';

const GameTable: FC = (): JSX.Element => {
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

  return (
    <div className="container-fluid h-100">
      <div className="row mt-5">
        <div className="col-2 d-flex">
          {/* teams */}
          <div className="d-flex flex-column">
            <div className="m-4">
              <h5 className="text-center">TEAMS</h5>
            </div>
            <div className="d-flex">
              <div className="mx-1 col">
                <TeamTable table={blueTeamProps} />
              </div>
              <div className="col">
                <TeamTable table={redTeamProps} />
              </div>
            </div>
          </div>
        </div>

        {/* cards */}
        <div className="col-8">
          <div className="d-flex flex-column justify-content-center">
            {/* turn */}
            <div className="d-flex justify-content-center w-100">
              <h5 className="align-left"><span className="text-primary">2</span>-<span className="text-danger">4</span></h5>
              <h5><span className="text-danger">RED's TURN</span></h5>

            </div>
            <div className="row col-12">

              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
            </div>
            <div className="row">

              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
            </div>
            <div className="row">

              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
            </div>
            <div className="row">

              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card ">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card">
                <h6>efe</h6>
              </div>
              <div className="card ">
                <h6>efe</h6>
              </div>
            </div>


          </div>

        </div>
        <div className="col">
          defe
        </div>


      </div>


    </div >

  );
}

export default GameTable;