// class
import Team from './Team';
//interface
import GamePhase from '../interfaces/GamePhase';

export default class Table {
  private static GAMEPHASE: GamePhase = {
    "red's turn": "blue's turn",
    "blue's turn": "red's turn",
    "red won": "red won",
    "blue won": "blue won"
  };
  private gamePhase: string;
  private redTeam: Team;
  private blueTeam: Team;

  constructor(redTeam: Team, blueTeam: Team) {
    this.redTeam = redTeam;
    this.blueTeam = blueTeam;
    this.gamePhase = "red's turn";
  }

}