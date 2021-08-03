import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
// interfaces
import ICard from '../interfaces/ICard';
import ICardColor from '../interfaces/ICardColor';
// context
import { SocketContext } from '../context/SocketContext';
import { GameDataContext } from '../context/GameDataContext';
// css module
import { cardStyleForOperative, cardStyleForSpymaster, clickedCardStyleForSpymasterAndOperative } from "../css/cardStyle";
const CardList = (cards: ICard[], key: number): JSX.Element => {
  // context
  const socket = useContext(SocketContext);
  const { tableData, playerData } = useContext(GameDataContext);
  let cardList: JSX.Element[] = [];
  const roomId: string = window.location.pathname.split("/").pop() as string;
  const cardColor = (card: ICard): ICardColor => {
    let color: ICardColor;
    if (card.isClicked) {
      console.log(card);
      color = clickedCardStyleForSpymasterAndOperative[card.team];
      console.log(color);
    }
    else {
      if (playerData.player.role === "OPERATIVE") color = cardStyleForOperative[card.team]
      else color = cardStyleForSpymaster[card.team];
    }

  return color;
};

const cardClicked = (card: ICard) => {
  if (playerData.player.role === "SPYMASTER") return;
  else {
    if ((playerData.player.team === "RED" && tableData.table.redTeam.phase === "GUESSING") || (playerData.player.team === "BLUE" && tableData.table.blueTeam.phase === "GUESSING")) {
      socket.emit("click-card", roomId, JSON.stringify(card));
    }
  }
}

for (const index in cards) {
  let currCard = cards[index];
  const color: ICardColor = cardColor(currCard);
  let ele: JSX.Element =
    <div id={`card-${currCard.word}`} className={`card col p-0 d-flex justify-content-center ${color!.bg}`} key={uuidv4()} onClick={() => cardClicked(currCard)}>
      <h6 id={`text-${currCard.word}`} className={`m-auto ${color!.text}`}>{currCard.word}</h6>
    </div>;
  cardList.push(ele);
}

return (
  <>
    {cardList != [] &&
      < div className="w-100 container">
        <div className="row flex-nowrap">
          {cardList}
        </div>
      </div >
    }
  </>
);
}

export default CardList;