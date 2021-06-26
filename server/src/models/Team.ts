// class
import Player from './Player';
import Spymaster from './Spymaster';
import Operative from './Operative';
// interface 
import TeamPhase from '../interfaces/TeamPhase';

export default class Team {
  private static GUESSCOUNT: number; //spymaster gives a clue and the team keeps the count that they can guess.
  private static CARDSREMAINING: number;
  private name: string; //red or blue
  private static PHASE: TeamPhase = {
    "GIVING A CLUE": "GUESSING",
    "GUESSING": "WAITING FOR TURN",
    "WAITING FOR TURN": "GIVING A CLUE"
  };
  private phase: string;
  private spymaster: Spymaster;
  private operatives: Operative[];
  private players: Player[]; //all team members

  constructor(name: string) {
    this.name = name;
    this.spymaster = Object(null); // Before game starts, somebody become a spymaster.
    this.operatives = []; //every players are operatives at first
    this.players = []; //no players unless somebody log in to Lobby
    this.phase = this.name === "RED" ? "GIVING A CLUE" : "WAITING FOR TURN";
    Team.GUESSCOUNT = -1;
    Team.CARDSREMAINING = this.name == "RED" ? 8 : 7; //red:8, blue:7
  }

  /*
    Each time users log in, add user to players
    NOTE: If 5 members are in the team, more players can't join.  
  */
  public addPlayer(newPlayer: Player): void {
    if (this.isMaximumLimitOfPlayers()) return;
    this.players.push(newPlayer);
  }

  // spymaster or operatives
  public giveRoles(): void {

  }

  /* ※ When it's applicable to folloing 1 to 3, Team.GUESSCOUNT should be 1, executing resetGuessCount() in advance.
      1.when the team could guess all
      2.when the team stop guessing to end turn
      3.when the team hit the wrong card. 
  */
  public isTurnEnd(): boolean {
    return Team.GUESSCOUNT < 0;
  }

  // the number of players has to be more than two.
  public isMoreTwoPlayers(): boolean {
    return this.players.length == 2;
  }

  // check if 5 members are in the team. 5 members are maximum limit
  public isMaximumLimitOfPlayers(): boolean {
    return this.players.length == 5;
  }

  public getguessCount(): number {
    return Team.GUESSCOUNT;
  }

  /*
    receive a number as string 

    1～9　→　convert it to number type
      ∞  →　convert it to infinity
  */
  public setguessCount(number: string): void {
    if (number == "∞") Team.GUESSCOUNT = Infinity;
    else Team.GUESSCOUNT = parseInt(number);
  }

  public resetGuessCount(): void {
    Team.GUESSCOUNT = -1;
  }

  public getPhase(): string {
    return this.phase;
  }

  public setPhase(): void {
    this.phase = Team.PHASE[this.phase];
  }

  /*
    set the count + 1 
    if the team could guess all, the team are qualified to get one more guess. 
  */
  public setGuessCount(count: number): void {
    Team.GUESSCOUNT = count + 1;
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public getSpymaster(): Spymaster {
    return this.spymaster;
  }

  public setSpymaster(spymaster: Spymaster) {
    this.spymaster = spymaster;
  }

}