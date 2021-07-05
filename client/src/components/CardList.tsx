import { FC, useEffect } from 'react';
//socket.io
import { io } from "socket.io-client";
// config
import config from '../config/config';
// interfaces
import IWord from '../interfaces/IWord';

let game = io(config.server.game);;

const CardList: FC<IWord> = ({ words }, key): JSX.Element => {
  let cardList: JSX.Element[] = [];
  const color = {
    "ASSASIN": { text: "text-dark", bg: ["bg-dark", "disabled", "stopHover"] },
    "BYSTANDER": { text: "text-success", bg: ["bg-success", "disabled", "stopHover"] },
    "RED": { text: "text-danger", bg: ["bg-danger", "disabled", "stopHover"] },
    "BLUE": { text: "text-primary", bg: ["bg-primary", "disabled", "stopHover"] }
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

  // game.emit("card-clicked", ,eventForclickedCard);
  game.on("card-clicked", () => {

  })

  for (const card in words) {
    let currCard = words[card];
    let Ele =
      <div id={`card${currCard.id.toString()}`} className={`card col p-0 d-flex justify-content-center`} key={currCard.id} onClick={(e) => eventForclickedCard(currCard)}>
        <h6 id={`text${currCard.id.toString()}`} className={`m-auto ${color[currCard.team].text}`}>{currCard.word}</h6>
      </div>;
    cardList.push(Ele);
  }
  return (
    <div className="w-100 container">
      <div className="row flex-nowrap">
        {cardList}
      </div>
    </div>
  );
}

export default CardList;