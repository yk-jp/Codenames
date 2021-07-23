// class
import Team from './Team';
import Card from './Card';
import Player from './Player';
import Operative from './Operative';
//interface
import IGamePhase from '../interfaces/GamePhase';
import IClue from '../interfaces/IClue';
import IPlayer from '../interfaces/IPlayer';
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
  private static PHASE: IGamePhase = {
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

  public haveTurn(inputData: IClue) {
    if (this.phase == "RED's TURN") {
      // RED's TURN
      if (this.redTeam.getPhase() == "GIVING A CLUE") {

        if (inputData) {
          //set a clue from the spymaster 
          this.redTeam.getSpymaster()!.setClue(inputData);
          // go to the next action
          this.redTeam.changePhase();
        }
      } else if (this.redTeam.getPhase() == "GUESSING") {

        if (!this.redTeam.isTurnEnd()) {
          // if() { 
          //   // IsCorrectAnswer

          // }
        } else {
          // go to the next action
          this.redTeam.changePhase();
        }

      }

    } else if (this.phase == "BLUE's TURN") {
      // RED's TURN
      if (this.blueTeam.getPhase() == "GIVING A CLUE") {
        if (inputData) {
          //set a clue from the spymaster 
          this.redTeam.getSpymaster()!.setClue(inputData);
          // go to the next action
          this.redTeam.changePhase();
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
  public setTeam(player: Player): Player {
    const team: string = this.players.length % 2 ? "RED" : "BLUE";
    player.setTeam(team);
    return player;
  }

  public deletePlayerFromPlayers(player: IPlayer): Player {
    const playerAt: number = this.playerAt(player);
    const deletedPlayer: Operative = Object.assign(new Operative("", "", "", ""), this.players[playerAt]);
    this.players[playerAt] = this.players[this.players.length - 1];
    this.players.pop();
    return deletedPlayer;
  };

  public playerAt(target: IPlayer): number {
    let playerAt: number = 0;
    this.players.map((player, index) => {
      if (target.id == player.getId()) playerAt = index;
    });
    return playerAt;
  };

  /*
     Each time users log in, add user to players
  */
  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public addPlayerToTeam(player: Player): void {
    // give a team to players
    player = this.setTeam(player);
    if (player.getTeam() == "RED") this.redTeam.setTeamMembers(player);
    else this.blueTeam.setTeamMembers(player);
  }

  public deletePlayerFromTeam(player: IPlayer): Player {
    if (player.team == "RED") return this.redTeam.deleteTeamMember(player);
    else return this.blueTeam.deleteTeamMember(player);
  }

  public setPlayers(players: Player[]) {
    this.players = players;
  }

  // the number of players has to be more than two.
  public joinedMoreTwoPlayers(): boolean {
    return this.players.length == 2;
  }

  public getGamePhase(): string {
    return this.phase;
  }

  public setGamePhase(phase: string): void {
    this.phase = phase;
  }

  //to switch gamephase
  public changeGamePhase(): void {
    this.phase = Table.PHASE[this.phase];
  }

  public getPlayers(): Player[] {
    return this.players;
  }
}