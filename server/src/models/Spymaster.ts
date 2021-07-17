import Player from './Player';
import Clue from '../interfaces/IClue';
// interface
import ISpymaster from '../interfaces/ISpymaster';
export default class Spymaster extends Player {
  private clue: Clue;

  constructor(name: string, id: string, role: string, team: string) {
    super(name, id, role, team);
    this.clue = { word: "", number: "" };
  }

  public setClue(clue: Clue): void {
    this.clue = clue;
  }

  public getClue(): Clue {
    return this.clue;
  }
}