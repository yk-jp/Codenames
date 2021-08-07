import { useEffect, useContext } from "react";
// config 
import Storage from "../../config/storage";
// context
import { GameDataContext } from "../../context/GameDataContext";
import { SocketContext } from "../../context/SocketContext";
// interface
import ICard from "../../interfaces/ICard";
import ICardColor from "../../interfaces/ICardColor";
// css module
import { cardStyleForOperative, cardStyleForSpymaster, clickedCardStyleForSpymasterAndOperative } from "./cardStyle";

const CardListController = () => {
  const { roomId } = Storage();
  // context
  const socket = useContext(SocketContext);
  const { tableData, playerData } = useContext(GameDataContext);

  useEffect(() => {
    return (() => {
      socket.off("click-card");
    });
  }, [socket]);

  const cardClicked = (card: ICard) => {
    if (playerData.player.role === "SPYMASTER") return;
    else {
      if ((playerData.player.team === "RED" && tableData.table.redTeam.phase === "GUESSING") || (playerData.player.team === "BLUE" && tableData.table.blueTeam.phase === "GUESSING")) {
        socket.emit("click-card", roomId, JSON.stringify(card), playerData.player.name);
      }
    }
  }

  const cardColor = (card: ICard): ICardColor => {
    let color: ICardColor;
    if (card.isClicked) color = clickedCardStyleForSpymasterAndOperative[card.team];

    else {
      if (playerData.player.role === "OPERATIVE") color = cardStyleForOperative[card.team]
      else color = cardStyleForSpymaster[card.team];
    }

    return color;
  };

  return { cardClicked, cardColor };
};


export default CardListController;

