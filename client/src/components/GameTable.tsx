import { FC, useState, useEffect } from 'react';
//components
import TeamTable from './TeamTable';
import CardList from './CardList';
import Pulldown from './Pulldown';
// interfaces
import IWord from '../interfaces/IWord';
// custom hook
import sliceWordList from '../hooks/sliceWordList';
// config
import config from '../config/config';
// others
import { blueTeamStyle, redTeamStyle } from '../css/teamTableStyle';


const GameTable: FC = (): JSX.Element => {
  // words
  const [wordSet, setWordSet] = useState<IWord["words"][]>([]);

  // fetch words
  const wordList = async () => {
    await fetch(config.word_URI)
      .then(res => {
        if (!res.ok) throw Error("Could not fetch data");
        return res.json();
      }
      )
      .then(data => {
        storeWordData(data);
      })
      .catch(err => console.log(err.message))
  }

  const storeWordData = async (data: IWord["words"]) => {
    const convertedData: IWord["words"][] = await sliceWordList(data);
    setWordSet(convertedData);
  };

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
                  <p>Link:</p><a id="link" href="url">efeafe</a>
                </div>
                <h5 className=""><span className="text-primary">2</span>-<span className="text-danger">4</span></h5>
              </div>
            </div>

            <div className="w-100 container">
              <div className="row flex-nowrap">
                <div className="card col p-0 d-flex justify-content-center" key={1}>
                  <h6 className="text-center m-0 word">word fefafe1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={2}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={3}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={4}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={5}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
              </div>
            </div>
            <div className="w-100 container">
              <div className="row flex-nowrap">
                <div className="card col p-0 d-flex justify-content-center" key={6}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={7}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={8}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={9}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={10}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
              </div>
            </div>
            <div className="w-100 container">
              <div className="row flex-nowrap">
                <div className="card col p-0 d-flex justify-content-center" key={11}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={12}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={13}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={14}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={15}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
              </div>
            </div>
            <div className="w-100 container">
              <div className="row flex-nowrap">
                <div className="card col p-0 d-flex justify-content-center" key={16}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={17}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={18}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={19}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={20}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
              </div>
            </div>
            <div className="w-100 container">
              <div className="row flex-nowrap">
                <div className="card col p-0 d-flex justify-content-center" key={21}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={22}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={23}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={24}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
                <div className="card col p-0 d-flex justify-content-center" key={25}>
                  <h6 className="text-center m-0 word">word 1</h6>
                </div>
              </div>
            </div>

            {/* 25 cards
            {wordSet.map((words, key) => {
              return <CardList words={words} key={key} />
            })} */}

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
    </div >
  );
}

export default GameTable;