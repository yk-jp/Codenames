import { useRef, useContext, useEffect } from 'react';
// component
import Pulldown from '../Pulldown/Pulldown';
// context
import { SocketContext } from '../../context/SocketContext';
import { GameDataContext } from '../../context/GameDataContext';
// interface
import IClue from '../../interfaces/IClue';

const Clue = (): JSX.Element => {
  // context
  const socket = useContext(SocketContext);
  const { tableData } = useContext(GameDataContext);
  // useRef
  const word = useRef<HTMLInputElement>(null);
  const number = useRef<HTMLOptionElement>(null);
  // others
  const roomId: string = window.location.pathname.split("/").pop() as string;
  const playerName:string = sessionStorage.getItem("playerName") as string;

  useEffect(() => {
    word.current!.focus();
  }, []);

  const isClueSameAsWord = (): boolean => {
    for (let i = 0; i < tableData.table.cards.length; i++) {
      if (word.current!.value === tableData.table.cards[i].word) return true;
    }
    return false;
  };

  const validationForClueController = (): boolean => {
    let isValidated: boolean = true;

    if (!word.current || word.current.value.split(" ")[0] === "" || !number.current || !number.current.value) {
      alert("GIVE A CLUE");
      isValidated = false;
    } else if (word.current!.value.split(" ").length > 1) {
      alert("YOU CAN ENTER ONLY ONE WORD");
      isValidated = false;
    } else if (isClueSameAsWord()) {
      alert("YOUR CLUE IS THE SAME AS ONE OF 25 CARDS");
      isValidated = false;
    }
    return isValidated;
  };

  const clueController = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!validationForClueController()) {
      e.preventDefault();
      return;
    }
    const clue: IClue = {
      "word": word.current!.value.toString(),
      "number": number.current!.value.toString()
    }
    socket.emit("give-a-clue", roomId, JSON.stringify(clue),playerName);
  }

  return (
    <div className="container mt-3">
      <div className="row flex-nowrap justify-content-center">
        <input ref={word} className="col-6 col-md-4" type="text" placeholder="ENTER A WORD" />
        <Pulldown ref={number} />
        <button type="button" className="btn btn-outline-success col-4 col-md-2 text-nowrap" onClick={(e) => clueController(e)}>SEND</button>
      </div>
    </div>
  );
};


export default Clue;