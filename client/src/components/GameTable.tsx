import { FC, useState, useEffect } from 'react';
//components
import TeamTable from './TeamTable';
// interfaces
import ITable from '../interfaces/ITable';

// custom hook
import sliceWordList from '../customHook/sliceWordList';

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
  const [active, setActive] = useState<string>("");

  //sidebar 
  const show = (): void => {
    active == "" ? setActive("active") : setActive("");
  }

  // test data
  const wordList: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y"];

  const [wordSets, setWordSet] = useState<string[][]>([]);

  useEffect(() => {
    //fetch wordList

    //slice list into small sized list for cards elements
    const convertedList = sliceWordList(wordList);
    setWordSet(convertedList);
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
          </div>

          <div className="d-flex justify-content-center">
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto word">efeefeeeeeeeeeeeeeeewwwwwwwww</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto ">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto word">efeefeeeeeeeeeeeeeeewwwwwwwww</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto ">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
          </div>


          <div className="d-flex justify-content-center">
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto word">efeefeeeeeeeeeeeeeeewwwwwwwww</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto ">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>

          </div>

          <div className="d-flex justify-content-center">
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto word">efeefeeeeeeeeeeeeeeewwwwwwwww</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto ">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto word">efeefeeeeeeeeeeeeeeewwwwwwwww</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto ">efe</h6>
            </div>
            <div className="card col">
              <h6 className="m-auto">efe</h6>
            </div>

          </div>

        </div>
      </div>


    </div >

  );
}

export default GameTable;