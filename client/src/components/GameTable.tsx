import { FC, useEffect, useContext } from 'react';
//components
import TeamTable from './TeamTable';
import CardList from './CardList';
import Clue from './Clue';
import EndGuess from './EndGuess';
// hook
import sliceWordList from '../hooks/sliceWordList';
import copyInputData from '../hooks/copyInputData';
// context
import { SocketContext } from '../context/SocketContext';
import { GameDataContext } from '../context/GameDataContext';
// others
import { blueTeamStyle, redTeamStyle } from '../css/teamTableStyle';

const GameTable: FC = (): JSX.Element => {
  const url: string = window.location.href;
  // context
  const socket = useContext(SocketContext);
  const { tableData, playerData } = useContext(GameDataContext);
  // data from localstorage
  const playerName: string = sessionStorage.getItem("playerName") as string;
  const playerId: string = sessionStorage.getItem("playerId") as string;

  return (
    <div className="container-fluid">
      <div className="row my-2 d-flex">
        <div className="offset-md-2 col-md-8 p-0">
          <div className="d-flex flex-column justify-content-center my-2">
            {/* turn */}
            <div className="container">
              <h5 className="text-center"><span className="text-danger">{JSON.stringify(tableData.table.phase).replace(/"/g, "")}</span></h5>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <button onClick={() => copyInputData("link")} className="btn btn-sm btn-outline-success h-20px">COPY</button><input id="link" className="h-20px" type="url" value={url} readOnly />
                </div>
                <div>
                  <h5 className=""><span className="text-primary">{JSON.stringify(tableData.table.blueTeam.cardsRemaining).replace(/"/g, "")}</span>-<span className="text-danger">{JSON.stringify(tableData.table.redTeam.cardsRemaining).replace(/"/g, "")}</span></h5>
                </div>
              </div>
            </div>

            {/* 25 cards */}
            {sliceWordList(tableData.table.cards).map((fiveCards, key) => {
              return <CardList {...fiveCards} key={key} />;
            })}

            {/* spymaster or operative */}
            <div className="form-check form-switch container mx-3 d-flex justify-content-end">
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
              <label className="form-check-label mx-2" htmlFor="flexSwitchCheckDefault">SPYMASTER</label>
            </div>
            {/* give a clue button */}
            <Clue />
            {/* end guess button */}
            <EndGuess />
          </div>
        </div>
        <div className="col w-100 mt-3 mt-md-5 p-0">
          {/* playerTable */}
          <div className="row justify-content-center">
            <div className="col-5 col-md p-0 mx-1">
              <TeamTable style={blueTeamStyle} />
            </div>
            <div className="col-5 col-md p-0 mx-1">
              <TeamTable style={redTeamStyle} />
            </div>
          </div>
          {/* log */}
          <div id="log" className="form-group col-12">
            <div className="dummy vh-30"></div>
            <textarea className="form-control resize-none bg-white p-0 log" id="comment" value="test sentences" readOnly></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameTable;