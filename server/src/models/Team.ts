// class
import Player from './Player';
import Spymaster from './Spymaster';
import Operative from './Operative';
// interface 
import TeamAction from '../interfaces/TeamAction';

export default class Team {
  private static GUESSCOUNT: number = -1; //spymaster gives a clue and the team keeps the count that they can guess.
  private teamName: string; //red or blue
  private static TEAMACTION: TeamAction = {
    "Giving a clue": "Guessing",
    "Guessing": "Waiting for turn",
    "Waiting for turn": "Giving a clue"
  };

  private static ACTION: string;
  private spymaster: Spymaster;
  private operatives: Operative[];
  private players: Player[];
  constructor(teamName: string) {
    this.teamName = teamName;
    this.spymaster = Object(null); // Before game starts, somebody become a spymaster.
    this.operatives = []; //every players are operatives at first
    this.players = []; //no players unless somebody log in to Lobby
    Team.ACTION = this.teamName === "red" ? "Giving a clue" : "Waiting for turn";
  }

  /*
    Each time users log in, add user to players
    NOTE: If 5 members are in the team, more players can't join.  
  */
  public addPlayer(newPlayer: Player): void {
    if (this.isMaximumLimitOfPlayers()) return;
    this.players.push(newPlayer);
  }

  // if start button is clicked, give a role to players, spymaster or operative.
  public giveRoles(): void {

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
    set the count + 1 
    if the team could guess all, the team are qualified to get one more guess. 
  */

  public setGuessCount(count: number): void {
    Team.GUESSCOUNT = count + 1;
  }

}