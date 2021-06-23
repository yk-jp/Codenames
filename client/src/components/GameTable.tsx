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
  //sidebar 
  const show = (): void => {
    active === "" ? setActive("active") : setActive("");
  }

  //useState
  const [active, setActive] = useState<string>("");
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

  useEffect(() => {
    //fetch wordList and arrange data into 5 × 5 list to render 
    wordList();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row my-2 d-flex">
        <div className="">
          {/* teams */}
          <div id="sidebar" className={active}>
            <div className="toggle-btn" onClick={() => show()}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className="d-flex justify-content-center">
              <li><TeamTable table={blueTeamStyle} /></li>
              <li><TeamTable table={redTeamStyle} /></li>
            </ul>
          </div>
        </div>
        <div className="offset-md-2 col-md-8 col-12 p-0">
          <div className="d-flex flex-column justify-content-center my-2">
            {/* turn */}
            <div className="w-100">
              <h5 className="text-center"><span className="text-danger">RED's TURN</span></h5>
              <h5 className="text-left"><span className="text-primary">2</span>-<span className="text-danger">4</span></h5>
            </div>
            {/* 25 cards */}
            {wordSet.map((words, key) => {
              return <CardList words={words} key={key} />
            })}

            {/* give a clue button */}
            <div className="d-flex justify-content-center">
              <input type="text" placeholder="ENTER A WORD" />
              <Pulldown />
              <button type="button" className="btn btn-outline-success">GIVE A CLUE</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default GameTable;