import { FC, useState } from 'react';
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

  //useState
  const [active, setActive] = useState("");


  //sidebar 
  const show = (): void => {
    active == "" ? setActive("active") : setActive("");
  }

  return (
    <div className="container-fluid">
      <div className="row mt-5 d-flex">
        <div className="col">
          {/* teams */}
          <div id="sidebar" className={active}>
            <div className="toggle-btn" onClick={() => show()}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className="d-flex justify-content-center">
              <li><TeamTable table={blueTeamProps} /></li>
              <li><TeamTable table={redTeamProps} /></li>
            </ul>
          </div>
        </div>
        {/* cards */}
        <div className="col-8">
          <div className="d-flex flex-column justify-content-center">
            {/* turn */}
            <div className="d-flex justify-content-center w-100">
              <h5 className=""><span className="text-primary">2</span>-<span className="text-danger">4</span></h5>
              <h5><span className="text-danger">RED's TURN</span></h5>
            </div>
            <div className="d-flex">
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


          </div>

        </div>
      </div>


    </div >

  );
}

export default GameTable;