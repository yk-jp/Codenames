// class
import Team from './Team';
import Card from './Card';
import Player from './Player';
import Operative from './Operative';
//interface
import IGamePhase from '../interfaces/IGamePhase';
import IGameStatus from '../interfaces/IGameStatus';
import IClue from '../interfaces/IClue';
import IPlayer from '../interfaces/IPlayer';
import WordsInstance from '../interfaces/schema/Words';


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
  public static PHASE: IGamePhase = {
    "RED's TURN": "BLUE's TURN",
    "BLUE's TURN": "RED's TURN",
    "RED WON": "RED WON",
    "BLUE WON": "BLUE WON"
  };

  public static GAMESTATUS: IGameStatus = {
    "START": "PLAYING",
    "PLAYING": "END",
    "END": "START"
  }

  public static TEAMS: string[] = ["RED", "BLUE", "BYSTANDER", "ASSASIN"];

  private phase: string;
  private players: Player[]; //all team members
  public redTeam: Team;
  public blueTeam: Team;
  public status: string;
  public cards: Card[];
  constructor() {
    this.players = []; //no players unless somebody log in to Lobby
    this.redTeam = new Team("RED");
    this.blueTeam = new Team("BLUE");
    this.phase = "RED's TURN";
    this.status = "START";
    this.cards = Array(25).fill(new Card("NO TEAM", ""));
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

  public updateCards(wordsData: WordsInstance[]): void {
    let cards: Card[] = [];

    // create Cards
    wordsData?.map((wordData, i) => {
      if (i == wordsData!.length - 2 || i == wordsData!.length - 3) cards.push(new Card(Table.TEAMS[Table.TEAMS.length - 2], wordData.word));
      else if (i == wordsData!.length - 1) cards.push(new Card(Table.TEAMS[Table.TEAMS.length - 1], wordData.word));
      else cards.push(new Card(Table.TEAMS[i % 3], wordData.word));
    });

    // shuffle and update cards
    this.cards = this.shuffleData(cards) as Card[];
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
    let team: string = this.blueTeam.getTeamMembers().length > this.redTeam.getTeamMembers().length ? "RED" : "BLUE";
    player.setTeam(team);
  }

  public shuffleMembers(): void {
    // initialize members
    this.redTeam.resetTeamMembers();
    this.blueTeam.resetTeamMembers();
    this.shuffleData(this.players);
    this.players.map(player => {
      this.addPlayerToTeam(player);
    });
  }

  /*
    shuffle card or players
  */
  public shuffleData(data: Player[] | Card[]): Player[] | Card[] {
    /*shuffle cards before setting them to table
     fisher algorithm
     Math.random() * (max - min) + min
   */
    for (let i = 0; i < data.length; i++) {
      let rand = Math.floor(Math.random() * (data.length - i));
      let temp = data[i];
      data[i] = data[rand];
      data[rand] = temp;
    }
    return data;
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
    this.setTeam(player);
    if (player.getTeam() === "RED") this.redTeam.setTeamMembers(player);
    else this.blueTeam.setTeamMembers(player);
  }

  public deletePlayerFromTeam(player: IPlayer): Player {
    if (player.team === "RED") return this.redTeam.deleteTeamMember(player);
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

  public getGameStatus(): string {
    return this.status;
  }

  public setGameStatus(status: string): void {
    this.status = status;
  }

  //to switch gamephase
  public changeGamePhase(): void {
    this.phase = Table.PHASE[this.phase];
  }

  public getPlayers(): Player[] {
    return this.players;
  }
}