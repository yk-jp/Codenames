import { useContext } from 'react';
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
import { GameDataContext } from '../../context/GameDataContext';
// css
import { blueTeamStyle, redTeamStyle } from '../TeamTable/teamTableStyle';
import GameTableStyle from './GameTable.module.css';
// controller
import StartGameController from './StartGameController';
import SpymasterController from './SpymasterController';
import GameTableController from './GameTableController';
import ShuffleController from './ShuffleController';
const GameTable = (): JSX.Element => {

  const { tableData, playerData } = useContext(GameDataContext);
  const { startGameText, startGameDisabled, startGameController } = StartGameController();
  const { isSpymasterActive, isSpymasterDisabled, activateSpymasterController } = SpymasterController();
  const { isShuffleDisabled, shuffleMembersController } = ShuffleController();
  
  GameTableController();

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
                  <button id="game-start-btn" type="button" className={`btn btn-success ${GameTableStyle["btn-sm"]} h-20px mr-1 resize`} disabled={startGameDisabled} onClick={(e) => startGameController(e)}>{startGameText}</button>
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