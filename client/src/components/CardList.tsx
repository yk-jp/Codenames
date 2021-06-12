import { FC } from 'react';
// interfaces
import IWord from '../interfaces/IWord';

const CardList: FC<IWord> = ({ words }, key): JSX.Element => {
  let cardList: JSX.Element[] = [];

  for (const card in words) {
    let currCard = words[card];
    cardList.push(
      <div className="card col" key={currCard.id}>
        <h6 className="m-auto">{currCard.word}</h6>
      </div>
    );
  }
  return (<div className="d-flex justify-content-center" key={key}>{cardList}</div>);
}

export default CardList;