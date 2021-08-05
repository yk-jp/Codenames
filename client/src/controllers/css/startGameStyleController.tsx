import { Dispatch } from "react";
import ITable from "../../interfaces/ITable";

export const toggleStartGame = (table: ITable, setStartGameDisabled: Dispatch<boolean>) => {
  if (table.blueTeam.teamMembers.length > 1 && table.redTeam.teamMembers.length > 1) setStartGameDisabled(false);
  else setStartGameDisabled(true);
};

export const chnageStartGameText = (table: ITable, setStartGameText: Dispatch<string>) => {
  if (table.status === "START") setStartGameText("START GAME");
  else setStartGameText("RESET GAME");
};


