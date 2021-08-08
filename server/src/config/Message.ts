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

const Func = {
  joinMessage: joinMessage,
  leaveMessage: leaveMessage,
  becomeSpymaster: becomeSpymaster,
  alertClueMessage:alertClueMessage,
  clueMessage: clueMessage
}

const maximumNumberOfPlayers: string = "Sorry, you can't join now :_(";
const isPlaying: string = "Sorry, wait for a while until current game ends :_(";

const Error = {
  maximumNumberOfPlayers: maximumNumberOfPlayers,
  isPlaying: isPlaying
}

const Message = {
  Func: Func,
  Error: Error
}

export default Message;