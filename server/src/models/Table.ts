// class
import Team from './Team';
import Card from './Card';
import Player from './Player';
//interface
import GamePhase from '../interfaces/GamePhase';
import Clue from '../interfaces/Clue';

/*
  RED's TURN 
      1.spymaster 
        give a clue
      2.operatives 
        one of the operatives clicks a card, They can guess or end their turn.   
      3.switch to blue's turn

  BLUE's TURN 
      The movement is the same as Red's Team

  RED WON
      end the game 
  BLUE WON
      end the game
*/

export default class Table {
  private static PHASE: GamePhase = {
    "RED's TURN": "BLUE's TURN",
    "BLUE's TURN": "RED's TURN",
    "RED WON": "RED WON",
    "BLUE WON": "BLUE WON"
  };
  private phase: string;
  private players: Player[]; //all team members

  public redTeam: Team;
  public blueTeam: Team;
  public cards: Card[];

  constructor() {
    this.players = []; //no players unless somebody log in to Lobby
    this.redTeam = new Team("RED");
    this.blueTeam = new Team("BLUE");
    this.phase = "RED's TURN";
    this.cards = [];
  }

  public haveTurn(inputData: Clue) {
    if (this.phase == "RED's TURN") {
      // RED's TURN
      if (this.redTeam.getPhase() == "GIVING A CLUE") {

        if (inputData) {
          //set a clue from the spymaster 
          this.redTeam.getSpymaster().setClue(inputData);
          // go to the next action
          this.redTeam.setPhase();
        }
      } else if (this.redTeam.getPhase() == "GUESSING") {

        if (!this.redTeam.isTurnEnd()) {
          // if() { 
          //   // IsCorrectAnswer

          // }
        } else {
          // go to the next action
          this.redTeam.setPhase();
        }

      }

    } else if (this.phase == "BLUE's TURN") {
      // RED's TURN
      if (this.blueTeam.getPhase() == "GIVING A CLUE") {
        if (inputData) {
          //set a clue from the spymaster 
          this.redTeam.getSpymaster().setClue(inputData);
          // go to the next action
          this.redTeam.setPhase();
        }
      }
      else {

      }

    }
  }

  /*
   The game can't be started unless both teams don't set up their spymaster
  */
  public IsSetSpymaster(): boolean {
    return this.redTeam.getSpymaster() != null && this.blueTeam.getSpymaster() != null;
  }


  /*odd: get player in the red Team 
   even:get player in the blue team.
  */
  public setTeam(player: Player): void {
    const team: string = this.players.length % 2 ? "RED" : "BLUE";
    player.setTeam(team);
  }

  /*
     Each time users log in, add user to players
    NOTE: If 5 members are in the team, more players can't join.  
  */
  public addPlayer(player: Player): void {
    this.setTeam(player);
    if (this.isMaximumLimitOfPlayers()) return;
    this.players.push(player);
  }

  public addPlayerToTeam(player: Player): void {
    if (player.getTeam() == "RED") this.redTeam.getTeamMembers().push(player);
    else this.blueTeam.getTeamMembers().push(player);
  }

  // check if 10 players joined in. 10 members are maximum limitation
  public isMaximumLimitOfPlayers(): boolean {
    return this.players.length == 10;
  }

  // the number of players has to be more than two.
  public isMoreTwoPlayers(): boolean {
    return this.players.length == 2;
  }

  public getGamePhase(): string {
    return this.phase;
  }

  //to switch gamephase
  public setGamePhase(): void {
    this.phase = Table.PHASE[this.phase];
  }

  public getPlayers(): Player[] {
    return this.players;
  }


}