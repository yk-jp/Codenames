import { FC, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// interfaces
import ICard from '../interfaces/ICard';

// context
import { SocketContext } from '../context/SocketContext';
import { GameDataContext } from '../context/GameDataContext';

const CardList: FC<ICard[]> = (cards, key): JSX.Element => {
  // context
  const socket = useContext(SocketContext);
  const { tableData, playerData } = useContext(GameDataContext);
  let cardList: JSX.Element[] = [];

  useEffect(() => {




  }, [])

  const color = {
    "ASSASIN": { text: "text-dark", bg: ["bg-dark", "disabled", "stopHover"] },
    "BYSTANDER": { text: "text-success", bg: ["bg-success", "disabled", "stopHover"] },
    "RED": { text: "text-danger", bg: ["bg-danger", "disabled", "stopHover"] },
    "BLUE": { text: "text-primary", bg: ["bg-primary", "disabled", "stopHover"] }
  }
  for (const index in cards) {
    let currCard = cards[index];
    let Ele =
      <div id={`card-${currCard.word}`} className={`card col p-0 d-flex justify-content-center`} key={uuidv4()} >
        <h6 id={`text-${currCard.word}`} className={`m-auto`}>{currCard.word}</h6>
      </div>;
    cardList.push(Ele);
  }

  const textColorAfterEvent: string = "text-white";

  let operative = "OPERATIVE";
  let spymaster = "SPYMASTER";

  const eventForclickedCard = (card) => {
    changeBg(card, color[card["team"]].bg);
    changeText(card, textColorAfterEvent);
  };

  const changeBg = (card, color) => {
    const div = document.querySelector(`#card${card["id"]}`)!;
    div.classList.add(...color);
  }

  const changeText = (card, color) => {
    const text = document.querySelector(`#text${card["id"]}`)!;
    text.classList.add(color);
  }

  return (
    <>{cardList != [] &&
      < div className="w-100 container" >
        <div className="row flex-nowrap">
          {cardList}
        </div>
      </div >
    }
    </>
  );
}

export default CardList;