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
  private teamMembers: Player[];
  private spymaster: Spymaster;
  private operatives: Operative[];

  constructor(name: string) {
    this.name = name;
    this.spymaster = Object(null); // Before game starts, somebody become a spymaster.
    this.operatives = []; //every players are operatives at first
    this.phase = this.name === "RED" ? "GIVING A CLUE" : "WAITING FOR TURN";
    this.teamMembers = [];
    Team.GUESSCOUNT = -1;
    Team.CARDSREMAINING = this.name == "RED" ? 8 : 7; //red:8, blue:7
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

  public getTeamMembers(): Player[] {
    return this.teamMembers;
  }

  public setTeamMembers(player: Player): void {
    this.teamMembers.push(player);
  }

  public setOperative(player: Player): void {
    this.operatives.push(player);
  }

  public getSpymaster(): Spymaster {
    return this.spymaster;
  }

  // if another player already have a role of spymaster, replace the role to an operative. 
  public setSpymaster(spymaster: Spymaster): void {
    if (this.spymaster) this.spymaster = spymaster; //spymaster == null
    // The new spymaster's data must be still stored in operatives.
    //swap data with the new Operative. 
    const operativeAt: number = this.operativeAt(spymaster.getId());
    const playerInfo = spymaster.getPlayerInfo();
    const newOperative: Operative = new Operative(playerInfo.name, playerInfo.id, playerInfo.team);

    this.spymaster = spymaster;
    this.operatives[operativeAt] = newOperative;
  }

  public operativeAt(id: string): number {
    let operativeAt: number = -1;
    this.operatives.map((operative, index) => {
      if (operative.getId() == id) operativeAt = index;
    });

    return operativeAt;
  }

}