import { v4 as uuidv4 } from 'uuid';
// interfaces
import ICard from '../../interfaces/ICard';
import ICardColor from '../../interfaces/ICardColor';
// css
import "./CardList.css";
import CardListStyle from './CardList.module.css';
// controller
import CardListController from './CardListController';

const CardList = (cards: ICard[], key: number): JSX.Element => {
  let cardList: JSX.Element[] = [];

  const { cardColor, cardClicked } = CardListController();

  for (const index in cards) {
    let currCard = cards[index];
    const color: ICardColor = cardColor(currCard);
    let ele: JSX.Element =
      <div id={`card-${currCard.word}`} className={`${CardListStyle.card} col p-0 d-flex justify-content-center ${color!.bg}`} key={uuidv4()} onClick={() => cardClicked(currCard)}>
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