import { useEffect, useState, useContext, useRef } from 'react';
// config
import Storage from '../../config/storage';
//components
import TeamTable from '../TeamTable/TeamTable';
import CardList from '../CardList/CardList';
import Clue from '../Clue/Clue';
import EndGuess from '../EndGuess/EndGuess';
import CardLanguageRadio from '../CardLanguageRadio/CardLanguageRadio';
import InviteUrl from '../InviteUrl/InviteUrl';
import Log from '../Log/Log';
// hook
import sliceWordList from '../../hooks/sliceWordList';
// context
import { SocketContext } from '../../context/SocketContext';
import { GameDataContext } from '../../context/GameDataContext';
// css
import { blueTeamStyle, redTeamStyle } from '../TeamTable/teamTableStyle';
import GameTableStyle from './GameTable.module.css';
// controller
import { startGameController,toggleStartGame, chnageStartGameText } from './StartGameController';

const GameTable = (): JSX.Element => {
  // context
  const socket = useContext(SocketContext);
  const { tableData, playerData } = useContext(GameDataContext);
  // useState
  const [startGameDisabled, setStartGameDisabled] = useState<boolean>(true);
  const [isShuffleDisabled, setIsShuffleDisabled] = useState<boolean>(false);
  const [isSpymasterDisabled, setIsSpymasterDisabled] = useState<boolean>(true);

  const [startGameText, setStartGameText] = useState<string>();
  const [isSpymasterActive, setIsSpymasterActive] = useState<boolean>(false);
  // data from localstorage
  const { playerId, roomId, isSpymaster } = Storage();

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

  useEffect(() => {
    // toggle start button depending on how many players each team has.
    toggleStartGame(tableData.table, setStartGameDisabled);
    // change start game text
    chnageStartGameText(tableData.table, setStartGameText);
    // spymaster toggle
    setIsSpymasterActive(isSpymaster === "true");
    // // spymaster button enable or disable
    disableSpymasterBtnController();
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
  }, [socket]);

  return (
    <div className="container-fluid">
      <div className="row my-2 d-flex">
        <div className="offset-md-2 col-md-8 p-0">
          <div className="d-flex flex-column justify-content-center my-2">
            {/* turn */}
            <div className="container">
              <h5 className="text-center">{tableData.table.status === "PLAYING" && (playerData.player.team === "RED"
                ? <span className="text-danger">{JSON.stringify(tableData.table.redTeam.phase).replace(/"/g, "")}</span>
                : <span className="text-primary">{JSON.stringify(tableData.table.blueTeam.phase).replace(/"/g, "")}</span>)}</h5>
              <h5 className="text-center">{tableData.table.status === "END" && ((playerData.player.team === "RED" && tableData.table.phase === "BLUE WON") ?
                <span className="text-primary">{JSON.stringify(tableData.table.phase).replace(/"/g, "")}</span>
                : <span className="text-danger">{JSON.stringify(tableData.table.phase).replace(/"/g, "")}</span>)}</h5>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <InviteUrl />
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
                <CardLanguageRadio />
                <div id="role" className="mt-1">
                  <input id="activate-spymaster" className="form-check-input" type="checkbox" onChange={(e) => { activateSpymasterController(e) }} checked={isSpymasterActive} disabled={isSpymasterDisabled} />
                  <label className="form-check-label mx-2" htmlFor="activate-spymaster">SPYMASTER</label>
                </div>
                {/* shuffle members */}
                <div id="shuffle">
                  <button type="button" className={`btn btn-outline-success ${GameTableStyle["btn-sm"]} h-20px mx-2 resize`} onClick={(e) => shuffleMembersController(e)} disabled={isShuffleDisabled}>SHUFFLE MEMBERS</button>
                </div>
                {/* start game */}
                <div id="game-start">
                  <button id="game-start-btn" type="button" className={`btn btn-success ${GameTableStyle["btn-sm"]} h-20px mr-1 resize`} disabled={startGameDisabled} onClick={(e) => startGameController(e, tableData.table, socket)}>{startGameText}</button>
                </div>
              </div>
            </div>
            {/* give a clue button */}
            {tableData.table.status !== "END" && (playerData.player.role === "SPYMASTER" && ((playerData.player.team === "RED" && tableData.table.redTeam.phase === "GIVING A CLUE") || (playerData.player.team === "BLUE" && tableData.table.blueTeam.phase === "GIVING A CLUE"))) && <Clue />}
            {/* end guess button */}
            {tableData.table.status !== "END" && (playerData.player.role === "OPERATIVE" && ((playerData.player.team === "RED" && tableData.table.redTeam.phase === "GUESSING") || (playerData.player.team === "BLUE" && tableData.table.blueTeam.phase === "GUESSING"))) && <EndGuess />}
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
          <Log />
        </div>
      </div>
    </div>
  );
}

export default GameTable;