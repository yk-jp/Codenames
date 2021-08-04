import { FC, useEffect, useState, useContext, useRef } from 'react';
//components
import TeamTable from './TeamTable';
import CardList from './CardList';
import Clue from './Clue';
import EndGuess from './EndGuess';
import CardLanguageRadio from './cardLanguage';
// hook
import sliceWordList from '../hooks/sliceWordList';
import copyInputData from '../hooks/copyInputData';
// context
import { SocketContext } from '../context/SocketContext';
import { GameDataContext } from '../context/GameDataContext';
// css
import { toggleStartGame, chnageStartGameText } from '../controllers/css/startGameStyleController';
import { blueTeamStyle, redTeamStyle } from '../css/teamTableStyle';

const GameTable: FC = (): JSX.Element => {
  const url: string = window.location.href;
  // context
  const socket = useContext(SocketContext);
  const { tableData, playerData } = useContext(GameDataContext);
  // useState
  const [startGameDisabled, setStartGameDisabled] = useState<boolean>(true);
  const [isShuffleDisabled, setIsShuffleDisabled] = useState<boolean>(false);
  const [isSpymasterDisabled, setIsSpymasterDisabled] = useState<boolean>(true);

  const [startGameText, setStartGameText] = useState<string>();
  const [isSpymasterActive, setIsSpymasterActive] = useState<boolean>(false);

  // useRef
  const cardLn = useRef<HTMLInputElement>(null);
  // data from localstorage
  const playerId: string = sessionStorage.getItem("playerId") as string;
  const isSpymaster: boolean = sessionStorage.getItem("isSpymaster") as string === "true";
  const roomId: string = window.location.pathname.split("/").pop() as string;
  const language: string = sessionStorage.getItem("language") as string;

  const activateSpymasterController = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      sessionStorage.setItem("isSpymaster", "true");
      socket.emit("activate-spymaster", playerId, roomId);
      setIsSpymasterActive(true);
    }
  };

  const disableSpymasterBtnController = () => {
    if (tableData.table.status !== "PLAYING") return;
    if ((playerData.player.team === "RED" && tableData.table.redTeam.phase === "GIVING A CLUE" && !tableData.table.redTeam.spymaster) || (playerData.player.team === "BLUE" && tableData.table.blueTeam.phase === "GIVING A CLUE" && !tableData.table.blueTeam.spymaster)) {
      setIsSpymasterDisabled(false);
    }
    else setIsSpymasterDisabled(true);
  };

  const shuffleStyleContoller = () => {
    if (tableData.table.status === "PLAYING") setIsShuffleDisabled(true);
    else setIsShuffleDisabled(false);
  };

  const shuffleMembersController = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (window.confirm("SHUFFLE MEMBERS ?")) socket.emit("shuffle-members", roomId);
    else e.preventDefault();
  }
  const startGameController = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (tableData.table.status == "START") {
      if (window.confirm("START GAME ?")) socket.emit("start-game", roomId, cardLn.current!.id);
      else e.preventDefault();
    } else {
      if (window.confirm("RESET GAME ?")) socket.emit("reset-game", roomId);
      else e.preventDefault();
    }
  }

  useEffect(() => {
    // toggle start button depending on how many players each team has.
    toggleStartGame(tableData.table, setStartGameDisabled);
    // change start game text
    chnageStartGameText(tableData.table, setStartGameText);
    // spymaster toggle
    setIsSpymasterActive(isSpymaster);
    // // spymaster button enable or disable
    disableSpymasterBtnController();
    // language option
    if (language) document.getElementById(language)!["checked"] = true;
    // style for shuffle button 
    shuffleStyleContoller();

  }, [tableData.table]);

  useEffect(() => {
    socket.on("activate-spymaster", (team: string) => {
      if (playerData.player.team === team) setIsSpymasterDisabled(true);
    });

    socket.on("reset-spymaster", () => {
      sessionStorage.removeItem("isSpymaster");
      setIsSpymasterDisabled(true);
      setIsSpymasterActive(false);
    });

    socket.on("alert-message", (message: string) => {
      alert(message);
    });

    socket.on("alert-for-spymaster", (message: string, team: string) => {
      if (playerData.player.team === team) {
        // enable players to hit the button
        setIsSpymasterDisabled(false);
        return alert(message);
      }
    });

    return () => {
      socket.off("activate-spymaster");
      socket.off("click-card");
      socket.off("alert-for-spymaster");
      socket.off("alert-message");
      socket.off("reset-spymaster");
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row my-2 d-flex">
        <div className="offset-md-2 col-md-8 p-0">
          <div className="d-flex flex-column justify-content-center my-2">
            {/* turn */}
            <div className="container">
              <h5 className="text-center">{tableData.table.status === "PLAYING" && (playerData.player.team === "RED" ? <span className="text-danger">{JSON.stringify(tableData.table.redTeam.phase).replace(/"/g, "")}</span> : <span className="text-primary">{JSON.stringify(tableData.table.blueTeam.phase).replace(/"/g, "")}</span>)}</h5>
              <h5 className="text-center">{tableData.table.status === "END" && (playerData.player.team === "RED" ? <span className="text-danger">{JSON.stringify(tableData.table.phase).replace(/"/g, "")}</span> : <span className="text-primary">{JSON.stringify(tableData.table.phase).replace(/"/g, "")}</span>)}</h5>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <button onClick={() => copyInputData("link")} className="btn btn-sm btn-outline-success h-20px">COPY</button><input id="link" className="h-20px" type="url" value={url} readOnly />
                </div>
                <div>
                  <h5><span className="text-primary">{JSON.stringify(tableData.table.blueTeam.cardsRemaining).replace(/"/g, "")}</span>-<span className="text-danger">{JSON.stringify(tableData.table.redTeam.cardsRemaining).replace(/"/g, "")}</span></h5>
                </div>
              </div>
            </div>

            {/* 25 cards */}
            {playerData.player && sliceWordList(tableData.table.cards).map((fiveCards, key) => {
              return <CardList {...fiveCards} key={key} />;
            })}

            {/* spymaster or operative */}
            <div className="form-check form-switch container d-flex justify-content-end">
              <div className="d-flex">
                {/* jp or en */}
                <CardLanguageRadio roomId={roomId} cardLn={cardLn} />
                <div id="role">
                  <input id="activate-spymaster" className="form-check-input" type="checkbox" onChange={(e) => { activateSpymasterController(e) }} checked={isSpymasterActive} disabled={isSpymasterDisabled} />
                  <label className="form-check-label mx-2" htmlFor="activate-spymaster" >SPYMASTER</label>
                </div>
                <div id="shuffle">
                  <button type="button" className="btn btn-outline-success btn-sm h-20px mx-2" onClick={(e) => shuffleMembersController(e)} disabled={isShuffleDisabled}>SHUFFLE MEMBERS</button>
                </div>
                <div id="game-start">
                  <button id="game-start-btn" type="button" className="btn btn-success btn-sm h-20px mr-1" disabled={startGameDisabled} onClick={(e) => startGameController(e)}>{startGameText}</button>
                </div>
              </div>
            </div>
            {/* give a clue button */}
            {tableData.table.status !== "END" && (playerData.player.role == "SPYMASTER" && ((playerData.player.team === "RED" && tableData.table.redTeam.phase === "GIVING A CLUE") || (playerData.player.team === "BLUE" && tableData.table.blueTeam.phase === "GIVING A CLUE"))) && <Clue />}
            {/* end guess button */}
            {tableData.table.status !== "END" && (playerData.player.role == "OPERATIVE" && ((playerData.player.team === "RED" && tableData.table.redTeam.phase === "GUESSING") || (playerData.player.team === "BLUE" && tableData.table.blueTeam.phase === "GUESSING"))) && <EndGuess />}
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
          <div id="log" className="form-group offset-sm-1 offset-md-0 col-10 col-md-12">
            <textarea className="form-control resize-none bg-white p-0 log mt-md-5" id="comment" value="Log
            " readOnly></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameTable;