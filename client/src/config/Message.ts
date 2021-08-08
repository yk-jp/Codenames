//confirm
const startGame: string = "START GAME ?";
const resetGame: string = "RESET GAME ?";
const shuffleMembers: string = "SHUFFLE MEMBERS ?";

const Confirm = {
  startGame: startGame,
  resetGame: resetGame,
  shuffleMembers: shuffleMembers
}

// error
const giveAClue: string = "GIVE A CLUE";
const enterOneWord: string = "YOU CAN ENTER ONLY ONE WORD";
const sameClueAsWord: string = "YOUR CLUE IS THE SAME AS ONE OF 25 CARDS";

const Error = {
  giveAClue: giveAClue,
  enterOneWord: enterOneWord,
  sameClueAsWord: sameClueAsWord
}

const Message = {
  Confirm: Confirm,
  Error: Error
}

export default Message;