import { Socket } from "socket.io-client";
// interface
import ICard from "../../interfaces/ICard";
import IPlayer from "../../interfaces/IPlayer";
import ITable from "../../interfaces/ITable";
import ICardColor from "../../interfaces/ICardColor";
// css module
import { cardStyleForOperative, cardStyleForSpymaster, clickedCardStyleForSpymasterAndOperative } from "./cardStyle";

export const cardClicked = (card: ICard, table: ITable, player: IPlayer, socket: Socket, roomId: string) => {
  if (player.role === "SPYMASTER") return;
  else {
    if ((player.team === "RED" && table.redTeam.phase === "GUESSING") || (player.team === "BLUE" && table.blueTeam.phase === "GUESSING")) {
      socket.emit("click-card", roomId, JSON.stringify(card), player.name);
    }
  }
}

export const cardColor = (card: ICard, player: IPlayer): ICardColor => {
  let color: ICardColor;
  if (card.isClicked) color = clickedCardStyleForSpymasterAndOperative[card.team];

  else {
    if (player.role === "OPERATIVE") color = cardStyleForOperative[card.team]
    else color = cardStyleForSpymaster[card.team];
  }

  return color;
};

