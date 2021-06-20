// besides the word from the database, it's needed to add a variable for team to detect which team it belongs to.

export default class Card {
  private team: string; // assasin or blue or red or bystander
  constructor(team: string) {
    this.team = team;
  }
}