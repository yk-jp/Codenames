import Player from './Player';
import Clue from '../interfaces/Clue';
export default class Spymaster extends Player {
  private clue: Clue;

  constructor(name: string, id: string, team: string) {
    super(name, id, team);
    this.clue = { word: "", number: "" };
  }

  public setClue(clue: Clue): void {
    this.clue = clue;
  }

  public getClue(): Clue {
    return this.clue;
  }
}