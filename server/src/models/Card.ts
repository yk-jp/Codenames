export default class Card {
  private word: string;
  private team: string; // assasin or blue or red or bystander

  constructor(team: string, word: string) {
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
    return this.word;
  }

}