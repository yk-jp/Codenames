// class
import Team from './Team';
import Card from './Card';
import Player from './Player';
import Operative from './Operative';
import Spymaster from './Spymaster';
//interface
import IGamePhase from '../interfaces/IGamePhase';
import IGameStatus from '../interfaces/IGameStatus';
import IClue from '../interfaces/IClue';
import IPlayer from '../interfaces/IPlayer';
import WordsInstance from '../interfaces/schema/Words';
import ICard from '../interfaces/ICard';
import { isJSDocReturnTag } from 'typescript';
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
    this.cards = Array(25).fill(new Card("NO TEAM", "", false));
  }

  public haveTurn(inputData?: IClue | string | Card) {
    if (this.isGameFinished()) return; //If game finished,

    const redTurn: boolean = this.isRedTurn();
    const team: Team = redTurn ? this.redTeam : this.blueTeam;
    if (team.getPhase() == "GIVING A CLUE") {
      // set guesscount
      team.setGuessCount(inputData as IClue);
      // go to the next action
      team.changePhase();
    } else if (team.getPhase() == "GUESSING") {
      if (!team.isTurnEnd() || inputData !== "END GUESSING") {
        // card judgement
        this.cardJudgement(inputData as Card);

        if (this.redTeam.isTeamWon() || this.blueTeam.isTeamWon()) {
          //If the number of card remaining is 0, team won 
          this.chanegGameStatus();
          if (this.redTeam.isTeamWon()) this.changeGamePhase("RED");
          else this.changeGamePhase("BLUE");
          return;
        }
      } else {
        // go to the next action
        team.changePhase();
        // reset guess count
        team.resetGuessCount();
        // change turn
        this.changeGamePhase();
      }
    }
  }

  public cardJudgement(card: Card): void {
    const team: string = this.isRedTurn() ? "RED" : "BLUE";
    if (this.isRedTurn() && card.getTeam() === team) {
      // correct answer
      this.redTeam.decreaseCardsRemaining();
      this.redTeam.decreaseGuessCount();
    } else if (!this.isRedTurn() && card.getTeam() === "BLUE") {
      // correct answer
      this.blueTeam.decreaseCardsRemaining();
      this.blueTeam.decreaseGuessCount();
    } else if (this.isRedTurn() && card.getTeam() === "BLUE") {
      /* wrong answer 
         red team hit the blue card
      */
      this.changeGamePhase();
      this.redTeam.resetGuessCount();
      this.redTeam.changePhase();
      this.blueTeam.changePhase();
    } else if (!this.isRedTurn() && card.getTeam() === "RED") {
      /* wrong answer 
       blue team hit the blue card
      */
      this.changeGamePhase();
      this.blueTeam.resetGuessCount();
      this.blueTeam.changePhase();
      this.redTeam.changePhase();
    }
    else if (card.getTeam() === "BYSTANDER") {
      if (this.isRedTurn()) {
        this.changeGamePhase();
        this.redTeam.resetGuessCount();
        this.redTeam.changePhase();
        this.blueTeam.changePhase();
      } else {
        this.changeGamePhase();
        this.blueTeam.resetGuessCount();
        this.blueTeam.changePhase();
        this.blueTeam.changePhase();
      }
    } else {
      // assasin
      if (this.isRedTurn()) {
        this.blueTeam.resetGuessCount();
      } else this.redTeam.resetGuessCount();
      // all cards are clicked so that all players can see every answers
      this.updateAllCard();
      return;
    }

    // update isClicked of card 
    this.updateCard(card);
  }

  public changeSpymastersToOperatives(): Operative[] {
    let spymasters: Spymaster[] = [];
    if (this.redTeam.getSpymaster()) spymasters.push(this.redTeam.getSpymaster()!);
    if (this.blueTeam.getSpymaster()) spymasters.push(this.blueTeam.getSpymaster()!);
    return spymasters.map(spymaster => {
      return new Operative(spymaster.getName(), spymaster.getId(), "OPERATIVE", spymaster.getTeam());
    });
    ;
  }

  public resetTable(): void {
    this.phase = "RED's TURN";
    this.status = "START";
    this.cards = Array(25).fill(new Card("NO TEAM", "", false));
    this.redTeam.resetTeam();
    this.blueTeam.resetTeam();
  };

  public updateCard(targetCard: Card): void {
    this.cards.map((card) => {
      if (card.getTeam() === targetCard.getTeam() && card.getWord() === targetCard.getWord()) card.setClicked();
    });
  }
  public updateAllCard(): void {
    this.cards.map((card) => {
      card.setClicked();
    });
  }

  public updateCards(wordsData: WordsInstance[]): void {
    let cards: Card[] = [];

    // create Cards
    wordsData?.map((wordData, i) => {
      if (i == wordsData!.length - 2 || i == wordsData!.length - 3) cards.push(new Card(Table.TEAMS[Table.TEAMS.length - 2], wordData.word, false));
      else if (i == wordsData!.length - 1) cards.push(new Card(Table.TEAMS[Table.TEAMS.length - 1], wordData.word, false));
      else cards.push(new Card(Table.TEAMS[i % 3], wordData.word, false));
    });

    // shuffle and update cards
    this.cards = this.shuffleData(cards) as Card[];

    //It's hard to swap the location of The card for assasin. execute the function focused on swaping it. 
    this.cards = this.swapCardForAssasin();
  }

  public swapCardForAssasin(): Card[] {
    let assasinAt: number = 0;
    this.cards.map((card, index) => {
      if (card.getTeam() === Table.TEAMS[Table.TEAMS.length - 1]) assasinAt = index;
    });
    // in-place algorithm
    //Math.random() * (max - min) + min
    const rand: number = Math.floor(Math.random() * (this.cards.length - 1));
    let temp = this.cards[assasinAt];
    this.cards[assasinAt] = this.cards[rand];
    this.cards[rand] = temp;
    return this.cards;
  };

  public setGuessCountOfTeam(clue: IClue): void {
    if (this.isRedTurn()) this.redTeam.setGuessCount(clue);
    else this.blueTeam.setGuessCount(clue);
  }

  public isRedTurn(): boolean {
    return (this.phase === "RED's TURN");
  }

  public isGameFinished(): boolean {
    return this.status === "END";
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
      let rand: number = Math.floor(Math.random() * (data.length - i));
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

  public chanegGameStatus(): void {
    this.status = Table.GAMESTATUS[this.status];
  }

  //to switch gamephase
  public changeGamePhase(team?: string): void {
    if (team) this.phase = team === "RED" ? Table.PHASE["RED WON"] : Table.PHASE["BLUE WON"];
    else this.phase = Table.PHASE[this.phase];
  }

  public getPlayers(): Player[] {
    return this.players;
  }
}