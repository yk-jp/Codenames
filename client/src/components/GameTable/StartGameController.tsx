import { useContext, useEffect, useState } from "react";
// config
import Storage from "../../config/storage";
import Term from "../../config/Term";
import Message from "../../config/Message";
// context
import { SocketContext } from '../../context/SocketContext';
import { GameDataContext } from '../../context/GameDataContext';

const StartGameController = () => {
  const { roomId } = Storage();

  // context
  const socket = useContext(SocketContext);
  const { tableData } = useContext(GameDataContext);
  // useState
  const [startGameDisabled, setStartGameDisabled] = useState<boolean>(true);
  const [startGameText, setStartGameText] = useState<string>();

  const startGameController = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { language } = Storage();
    if (tableData.table.status === Term.GameStatus.START) {
      if (window.confirm(Message.Confirm.startGame)) socket.emit("start-game", roomId, language);
      else e.preventDefault();
    } else {
      if (window.confirm(Message.Confirm.resetGame)) socket.emit("reset-game", roomId);
      else e.preventDefault();
    }
  }

  const toggleStartGame = () => {
    if (tableData.table.blueTeam.teamMembers.length > 1 && tableData.table.redTeam.teamMembers.length > 1) setStartGameDisabled(false);
    else if (tableData.table.status === Term.GameStatus.PLAYING && tableData.table.players.length < 4) setStartGameDisabled(false);
    else setStartGameDisabled(true);
  };

  const chnageStartGameText = () => {
    if (tableData.table.status === Term.GameStatus.START) setStartGameText("START GAME");
    else setStartGameText("RESET GAME");
  };

  useEffect(() => {
    // toggle start button depending on how many players each team has.
    toggleStartGame();
    // change start game text
    chnageStartGameText();
  }, [tableData.table]);

  return { startGameDisabled, startGameText, startGameController };
};

export default StartGameController;


