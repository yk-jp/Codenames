import En_wordsInstance from '../interfaces/En_words';
// besides the word from the database, it's needed to add a variable for team to detect which team it belongs to.

export default class Card {
  private team: string; // assasin or blue or red or bystander
  private word: En_wordsInstance;
  constructor(team: string, word: En_wordsInstance) {
    this.team = team;
    this.word = word;
  }

  public getTeam(): string {
    return this.team;
  }

  public setTeam(team: string): void {
    this.team = team;
  }

  public getWord(): string {
    return this.word.word;
  }

  public getwordId(): number {
    return this.word.id;
  }

}