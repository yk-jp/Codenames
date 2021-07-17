// class
import Player from './Player';
import Spymaster from './Spymaster';
import Operative from './Operative';
// interface 
import TeamPhase from '../interfaces/ITeamPhase';

export default class Team {
  private guessCount: number; //spymaster gives a clue and the team keeps the count that they can guess.
  private cardsRemaining: number;
  private name: string; //red or blue
  private static PHASE: TeamPhase = {
    "GIVING A CLUE": "GUESSING",
    "GUESSING": "WAITING FOR TURN",
    "WAITING FOR TURN": "GIVING A CLUE"
  };
  private phase: string;
  private teamMembers: (Spymaster | Operative)[];
  private spymaster: Spymaster | null;
  private operatives: Operative[];

  constructor(name: string) {
    this.name = name;
    this.spymaster = null; // Before game starts, somebody become a spymaster.
    this.operatives = []; //every players are operatives at first
    this.phase = this.name === "RED" ? "GIVING A CLUE" : "WAITING FOR TURN";
    this.teamMembers = [];
    this.guessCount = -1;
    this.cardsRemaining = this.name == "RED" ? 8 : 7; //red:8, blue:7
  }

  // spymaster or operatives
  public giveRoles(): void {

  }

  /* ※ When it's applicable to folloing 1 to 3, this.guessCount should be 1, executing resetGuessCount() in advance.
      1.when the team could guess all
      2.when the team stop guessing to end turn
      3.when the team hit the wrong card. 
  */
  public isTurnEnd(): boolean {
    return this.guessCount < 0;
  }

  public getguessCount(): number {
    return this.guessCount;
  }

  /*
    receive a number as string 

    1～9　→　convert it to number type
      ∞  →　convert it to infinity
  */
  public setGuessCount(number: string): void {
    if (number == "∞") this.guessCount = Infinity;
    else this.guessCount = parseInt(number) + 1;
  }

  public resetGuessCount(): void {
    this.guessCount = -1;
  }

  public getCardsRemaining(): number {
    return this.cardsRemaining;
  }

  public setCardsRemaining(number: string): void {
    this.cardsRemaining = parseInt(number);
  }

  public getPhase(): string {
    return this.phase;
  }

  public setPhase(phase: string): void {
    this.phase = this.phase;
  }

  public changePhase(): void {
    this.phase = Team.PHASE[this.phase];
  }

  public getTeamMembers(): Player[] {
    return this.teamMembers;
  }

  public setTeamMembers(player: Player): void {
    this.teamMembers.push(player);
  }

  public setOperative(operative: Operative | Operative[]): void {
    if (operative instanceof Operative) this.operatives.push(operative);
    else this.operatives.push(...operative);
  }

  public getSpymaster(): Spymaster | null {
    if (!this.spymaster) return null;
    return this.spymaster;
  }

  // if another player already have a role of spymaster, replace the role to an operative. 
  public setSpymaster(spymaster: Spymaster | null): void {
    if (!this.spymaster) this.spymaster = spymaster; //spymaster == null
    // The new spymaster's data must be still stored in operatives.
    //swap data with the new Operative. 
    const operativeAt: number = this.operativeAt(spymaster!.getId());
    const playerInfo = spymaster!.getPlayerInfo();
    const newOperative: Operative = new Operative(playerInfo.name, playerInfo.id, playerInfo.role, playerInfo.team);

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