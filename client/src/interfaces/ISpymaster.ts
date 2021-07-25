import IPlayer from "./IPlayer";

export default interface ISpymaster extends IPlayer {
  clue: {
    word: string;
    number: string;
  }
}