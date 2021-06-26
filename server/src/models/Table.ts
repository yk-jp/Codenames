// class
import Team from './Team';
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
  public redTeam: Team;
  public blueTeam: Team;
  public cardCache: boolean[];

  constructor(redTeam: Team, blueTeam: Team) {
    this.redTeam = redTeam;
    this.blueTeam = blueTeam;
    this.phase = "RED's TURN";
    this.cardCache = []; // manage cards that are clicked.
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


  public getGamePhase(): string {
    return this.phase;
  }

  //to switch gamephase
  public setGamePhase(): void {
    this.phase = Table.PHASE[this.phase];
  }

}