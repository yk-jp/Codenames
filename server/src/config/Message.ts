import IClue from "../interfaces/IClue";

const joinMessage = (playerName: string) => {
  return `${playerName} joined :)`;
};

const leaveMessage = (playerName: string) => {
  return `${playerName} left :(`;
}

const becomeSpymaster = (playerName: string) => {
  return `${playerName} became a spymaster`;
};

const alertClueMessage = (clue: IClue) => {
  return `${clue.word} ${clue.number}`;
};

const clueMessage = (playerName: string, clue: IClue) => {
  return `${playerName} gave clue "${clue.word} ${clue.number}" `;
};

const endGuess = (playerName: string) => {
  return `${playerName} ended guess`;
}

const clickCard = (playerName: string, word: string) => {
  return `${playerName} clicked "${word}"`;
}

const teamWon = (msg: string) => {
  return `${msg} =D>`;
};

const Func = {
  joinMessage: joinMessage,
  leaveMessage: leaveMessage,
  becomeSpymaster: becomeSpymaster,
  alertClueMessage: alertClueMessage,
  clueMessage: clueMessage,
  endGuess: endGuess,
  clickCard: clickCard,
  teamWon: teamWon
}

// alert
const selectSpymater: string = "SELECT A SPYMASTER";
const startGame:string ="game start!";
const initialized:string = "initialized";

const Alert = {
  selectSpymater: selectSpymater,
  startGame:startGame,
  initialized:initialized
}

// error
const maximumNumberOfPlayers: string = "Sorry, you can't join now :_(";
const isPlaying: string = "Sorry, wait for a while until current game ends :_(";

const Error = {
  maximumNumberOfPlayers: maximumNumberOfPlayers,
  isPlaying: isPlaying
}

const Message = {
  Func: Func,
  Alert: Alert,
  Error: Error
}

export default Message;