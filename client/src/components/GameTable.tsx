import { FC, useState, useEffect } from 'react';
//components
import TeamTable from './TeamTable';
import CardList from './CardList';
import Pulldown from './Pulldown';
// interfaces
import ITable from '../interfaces/ITable';
import IWord from '../interfaces/IWord';
// custom hook
import sliceWordList from '../customHook/sliceWordList';
// config
import { WORD_URI } from '../config/config';


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
    await fetch(WORD_URI)
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
              <li><TeamTable table={blueTeamProps} /></li>
              <li><TeamTable table={redTeamProps} /></li>
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