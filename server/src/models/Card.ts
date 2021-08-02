export default class Card {
  private word: string;
  private team: string; // assasin or blue or red or bystander
  private isClicked: boolean;
  constructor(team: string, word: string, isClicked: boolean) {
    this.team = team;
    this.word = word;
    this.isClicked = isClicked;
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

  public setClicked(): void {
    this.isClicked = true;
  }

  public getClicked(): boolean {
    return this.isClicked;
  }

}