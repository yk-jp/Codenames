import { useContext, useRef, useEffect } from "react";
// config 
import Storage from "../../config/storage";
import Message from "../../config/Message";
// context
import { SocketContext } from '../../context/SocketContext';
import { GameDataContext } from '../../context/GameDataContext';
// interface
import IClue from '../../interfaces/IClue';

const ClueController = () => {
  const { roomId, playerName } = Storage();
  // context
  const socket = useContext(SocketContext);
  const { tableData } = useContext(GameDataContext);
  // useRef
  const word = useRef<HTMLInputElement>(null);
  const number = useRef<HTMLOptionElement>(null);

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
      alert(Message.Error.giveAClue);
      isValidated = false;
    } else if (word.current!.value.split(" ").length > 1) {
      alert(Message.Error.enterOneWord);
      isValidated = false;
    } else if (isClueSameAsWord()) {
      alert(Message.Error.sameClueAsWord);
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
    socket.emit("give-a-clue", roomId, JSON.stringify(clue), playerName);
  }

  return { word, number, clueController };
};

export default ClueController;