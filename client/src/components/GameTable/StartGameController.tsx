import { Dispatch } from "react";
import ITable from "../../interfaces/ITable";
import { Socket } from "socket.io-client";
import Storage from "../../config/storage";

export const startGameController = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, table: ITable, socket: Socket) => {
  const { language, roomId } = Storage();
  if (table.status === "START") {
    if (window.confirm("START GAME ?")) socket.emit("start-game", roomId, language);
    else e.preventDefault();
  } else {
    if (window.confirm("RESET GAME ?")) socket.emit("reset-game", roomId);
    else e.preventDefault();
  }
}

export const toggleStartGame = (table: ITable, setStartGameDisabled: Dispatch<boolean>) => {
  if (table.blueTeam.teamMembers.length > 1 && table.redTeam.teamMembers.length > 1) setStartGameDisabled(false);
  else if (table.status === "PLAYING" && table.players.length < 4) setStartGameDisabled(false);
  else setStartGameDisabled(true);
};

export const chnageStartGameText = (table: ITable, setStartGameText: Dispatch<string>) => {
  if (table.status === "START") setStartGameText("START GAME");
  else setStartGameText("RESET GAME");
};
