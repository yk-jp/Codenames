import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Storage from '../../config/storage';
// interfaces
import ICard from '../../interfaces/ICard';
import ICardColor from '../../interfaces/ICardColor';
// context
import { SocketContext } from '../../context/SocketContext';
import { GameDataContext } from '../../context/GameDataContext';

import "./CardList.css";
import CardListStyle from './CardList.module.css';
// controller
import { cardClicked, cardColor } from './cardListController';

const CardList = (cards: ICard[], key: number): JSX.Element => {
  const { roomId } = Storage();
  // context
  const socket = useContext(SocketContext);
  const { tableData, playerData } = useContext(GameDataContext);

  let cardList: JSX.Element[] = [];

  for (const index in cards) {
    let currCard = cards[index];
    const color: ICardColor = cardColor(currCard, playerData.player);
    let ele: JSX.Element =
      <div id={`card-${currCard.word}`} className={`${CardListStyle.card} col p-0 d-flex justify-content-center ${color!.bg}`} key={uuidv4()} onClick={() => cardClicked(currCard, tableData.table, playerData.player, socket, roomId)}>
        <h6 id={`text-${currCard.word}`} className={`m-auto ${color!.text} ${CardListStyle.word}`}>{currCard.word}</h6>
      </div>;
    cardList.push(ele);
  }

  return (
    <>
      {cardList !== [] &&
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