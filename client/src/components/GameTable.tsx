import { FC, useEffect, useState, useContext, Dispatch, useRef, RefObject } from 'react';
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
import { Socket } from 'dgram';
// interface
import IOperative from '../interfaces/IOperative';
import ITable from '../interfaces/ITable';

const GameTable: FC = (): JSX.Element => {
  const url: string = window.location.href;
  // context
  const socket = useContext(SocketContext);
  const { tableData, playerData } = useContext(GameDataContext);
  // useState
  const [startGameDisabled, setStartGameDisabled] = useState<boolean>(true);
  const [startGameText, setStartGameText] = useState<string>();
  const [isSpymasterActive, setIsSpymasterActive] = useState<boolean>(false);
  // useRef
  const cardLn = useRef<HTMLInputElement>(null);
  // data from localstorage
  const playerId: string = sessionStorage.getItem("playerId") as string;
  const isSpymaster: boolean = sessionStorage.getItem("isSpymaster") as string === "true";
  const roomId: string = window.location.pathname.split("/").pop() as string;
  const language: string = sessionStorage.getItem("language") as string;

  const activateSpymasterController = (e: React.ChangeEvent<HTMLInputElement>, socket: Socket, setIsSpymasterActive: Dispatch<boolean>, player: IOperative, roomId: string) => {
    // if (e.target.checked) {
    //   sessionStorage.setItem("isSpymaster", "true");
    //   socket.emit("activate-spymaster", JSON.stringify(player), roomId);
    //   setIsSpymasterActive(true);
    // } else {
    //   sessionStorage.setItem("isSpymaster", "false");
    //   setIsSpymasterActive(false);
    // };
  };

  const shuffleMembersController = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (window.confirm("SHUFFLE MEMBERS ?")) socket.emit("shuffle-members", roomId);
    else e.preventDefault();
  }
  const startGameController = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, socket: Socket, table: ITable, roomId: string, cardLn: RefObject<HTMLInputElement>) => {
    if (table.status == "START") {
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
    // language option
    if (language) document.getElementById(language)!["checked"] = true;
    socket.on("activate-spymaster", (team: string | null) => {
      if (!team || playerData.player.team === team) {
        sessionStorage.setItem("isSpymaster", "false");
        setIsSpymasterActive(false);
      }
    });

    return () => {
      socket.off("activate-spymaster");
    };
  }, [tableData.table, playerData.player]);

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
                  <h5><span className="text-primary">{JSON.stringify(tableData.table.blueTeam.cardsRemaining).replace(/"/g, "")}</span>-<span className="text-danger">{JSON.stringify(tableData.table.redTeam.cardsRemaining).replace(/"/g, "")}</span></h5>
                </div>
              </div>
            </div>

            {/* 25 cards */}
            {sliceWordList(tableData.table.cards).map((fiveCards, key) => {
              return <CardList {...fiveCards} key={key} />;
            })}

            {/* spymaster or operative */}
            <div className="form-check form-switch container d-flex justify-content-end">
              <div className="d-flex">
                {/* jp or en */}
                <CardLanguageRadio roomId={roomId} cardLn={cardLn} />
                <div id="role">
                  <input id="activate-spymaster" className="form-check-input" type="checkbox" onChange={(e) => { activateSpymasterController(e, socket, setIsSpymasterActive, playerData.player, roomId) }} checked={isSpymasterActive} />
                  <label className="form-check-label mx-2" htmlFor="activate-spymaster" >SPYMASTER</label>
                </div>
                <div id="shuffle">
                  <button type="button" className="btn btn-outline-success btn-sm h-20px mx-2" onClick={(e) => shuffleMembersController(e)}>SHUFFLE MEMBERS</button>
                </div>
                <div id="game-start">
                  <button id="game-start-btn" type="button" className="btn btn-success btn-sm h-20px mr-1" disabled={startGameDisabled} onClick={(e) => startGameController(e, socket, tableData.table, roomId, cardLn)}>{startGameText}</button>
                </div>
              </div>
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