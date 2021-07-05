import { FC, useState, useEffect } from 'react';
//components
import TeamTable from './TeamTable';
import CardList from './CardList';
import Pulldown from './Pulldown';
// hook
import sliceWordList from '../hooks/sliceWordList';
import copyInputData from '../hooks/copyInputData';
// others
import { blueTeamStyle, redTeamStyle } from '../css/teamTableStyle';
import IWord from '../interfaces/IWord';

import wordList from '../test/wordList';
const GameTable: FC = (): JSX.Element => {

  const words = sliceWordList(wordList["words"]);

  return (
    <div className="container-fluid">
      <div className="row my-2 d-flex">
        <div className="offset-md-2 col-md-8 p-0">
          <div className="d-flex flex-column justify-content-center my-2">
            {/* turn */}
            <div className="container">
              <h5 className="text-center"><span className="text-danger">RED's TURN</span></h5>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <button onClick={() => copyInputData("link")} className="btn btn-sm btn-outline-success h-20px">COPY</button><input id="link" className="h-20px" type="url" value={window.location.href} readOnly></input>
                </div>
                <div>
                  <h5 className=""><span className="text-primary">2</span>-<span className="text-danger">4</span></h5>
                </div>
              </div>
            </div>

            {/* 25 cards */}
            {words.map((fiveWords, key) => {
              return <CardList words={fiveWords} key={key} />
            })}

            {/* give a clue button */}
            <div className="container mt-3">
              <div className="row flex-nowrap justify-content-center">
                <input className="col-6 col-md-4" type="text" placeholder="ENTER A WORD" />
                <Pulldown />
                <button type="button" className="btn btn-outline-success col-4 col-md-2 text-nowrap">SEND</button>
              </div>
            </div>
          </div>
        </div>
        {/* playerTable */}
        <div className="col w-100 mt-3 mt-md-5 p-0">
          <div className="row justify-content-center">
            <div className="col-5 col-md p-0 mx-1">
              <TeamTable table={blueTeamStyle} />
            </div>
            <div className="col-5 col-md p-0 mx-1">
              <TeamTable table={redTeamStyle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameTable;