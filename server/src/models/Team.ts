// config
import Term from '../config/Term';
// class
import Player from './Player';
import Spymaster from './Spymaster';
import Operative from './Operative';
// interface 
import ITeamPhase from '../interfaces/ITeamPhase';
import IPlayer from '../interfaces/IPlayer';
import IClue from '../interfaces/IClue';

export default class Team {
  private guessCount: number; //spymaster gives a clue and the team keeps the count that they can guess.
  private cardsRemaining: number;
  private name: string; //red or blue

  private static PHASE: ITeamPhase = {
    [Term.TeamPhase.GIVINGACLUE]: Term.TeamPhase.GUESSING,
    [Term.TeamPhase.GUESSING]: Term.TeamPhase.WAITINGFORTURN,
    [Term.TeamPhase.WAITINGFORTURN]: Term.TeamPhase.GIVINGACLUE
  };

  private phase: string;
  private teamMembers: Player[]; // each object is always operatives 
  private spymaster: Spymaster | null;
  private operatives: Operative[];

  constructor(name: string) {
    this.name = name;
    this.spymaster = null; // Before game starts, somebody become a spymaster.
    this.operatives = []; //every players are operatives at first
    this.phase = (this.name === Term.Team.RED) ? Term.TeamPhase.GIVINGACLUE : Term.TeamPhase.WAITINGFORTURN;
    this.teamMembers = [];
    this.guessCount = -1;
    this.cardsRemaining = this.name == Term.Team.RED ? 8 : 7; //red:8, blue:7
  }

  // ********************GuessCount ****************** // 
  /*
    receive a number as string 
    1～9　→　convert it to number type
  */
  public setGuessCount(clue: IClue): void {
    this.guessCount = parseInt(clue.number) + 1;
  }

  public setGuessCountForJSON(number: string): void {
    this.guessCount = parseInt(number);
  }

  public resetGuessCount(): void {
    this.guessCount = -1;
  }

  public getguessCount(): number {
    return this.guessCount;
  }

  public decreaseGuessCount(): void {
    this.guessCount -= 1;
  }

  // ********************Card remainings ****************** // 

  public decreaseCardsRemaining(): void {
    this.cardsRemaining -= 1;
  }

  public getCardsRemaining(): number {
    return this.cardsRemaining;
  }

  public setCardsRemaining(number: string): void {
    this.cardsRemaining = parseInt(number);
  }

  // ******************** team phase ****************** // 

  public getPhase(): string {
    return this.phase;
  }

  public setPhase(phase: string): void {
    this.phase = phase;
  }

  public changePhase(): void {
    this.phase = Team.PHASE[this.phase];
  }

  // ******************** team members ****************** // 

  public getTeamMembers(): Player[] {
    return this.teamMembers;
  }

  public resetTeamMembers(): void {
    this.teamMembers = [];
  }

  public setTeamMembers(players: Player | Player[]): void {
    if (Array.isArray(players)) this.teamMembers = players; // If players is array,
    else this.teamMembers.push(players);
  }

  public deleteTeamMember(player: IPlayer): Spymaster | Operative {
    const deletedPlayer: Spymaster | Operative = this.deleteMemberFromTeamMembers(player);
    if (player.role === Term.Role.OPERATIVE) this.deleteOperative(player);
    else this.deleteSpymaster(player);

    return deletedPlayer;
  }

  public deleteMemberFromTeamMembers(target: IPlayer): Operative {
    const playerAt: number = this.playerAt(this.teamMembers, target.id) as number;
    const deletedPlayer: Operative = this.teamMembers[playerAt];
    this.teamMembers[playerAt] = this.teamMembers[this.teamMembers.length - 1];
    this.teamMembers.pop();
    return deletedPlayer;
  };

  // ******************** spymaster ****************** // 

  public deleteSpymaster(target: IPlayer): Spymaster | null {
    let spymaster: Spymaster | null = null;
    if (!this.spymaster) return null;
    if (this.spymaster.getId() === target.id) {
      spymaster = this.spymaster;
      this.spymaster = null;
    }
    return spymaster;
  }

  public getSpymaster(): Spymaster | null {
    if (!this.spymaster) return null;
    return this.spymaster;
  }

  public setSpymaster(spymaster: Spymaster | null): void {
    if (!this.spymaster) this.spymaster = spymaster;
    else this.spymaster = spymaster;
  }

  // ******************** Operatives ****************** // 

  public deleteOperative(target: IPlayer): Operative | null {
    const playerAt: number | null = this.playerAt(this.operatives, target.id);
    if (!playerAt) return null;
    const deletedPlayer: Operative = this.operatives[playerAt];
    this.operatives[playerAt] = this.operatives[this.operatives.length - 1];
    this.operatives.pop();
    return deletedPlayer;
  }

  public setOperative(operative: Operative | Operative[]): void {
    if (operative instanceof Operative) this.operatives.push(operative);
    else this.operatives.push(...operative);
  }

  public getOperatives(): Operative[] {
    return this.operatives;
  }

  // ******************** helper ****************** // 
  public playerAt(players: Player[], playerId: string): number | null {
    let playerAt: number | null = null;
    players.map((player, index) => {
      if (player.getId() === playerId) playerAt = index;
    });
    return playerAt;
  }

  /* ※ When it's applicable to folloing 1 to 3, this.guessCount should be 1, executing resetGuessCount() in advance.
      1.when the team could guess all
      2.when the team stop guessing to end turn
      3.when the team hit the wrong card. 
  */
  public isTurnEnd(): boolean {
    return this.guessCount <= 0;
  }

  public isTeamWon(): boolean {
    return this.cardsRemaining <= 0
  }

  /*  
    receive player id of the player who will become a spymaster and divide players
  */
  public dividePlayers(player: Spymaster): void {
    const playerId: string = player.getId();
    this.teamMembers.map(member => {
      if (member.getId() === playerId) this.setSpymaster(player);  // don't update the player in teamMember.  
      else this.operatives.push(member);
    });
  };

  public resetTeam(): void {
    this.phase = (this.name === Term.Team.RED) ? Term.TeamPhase.GIVINGACLUE : Term.TeamPhase.WAITINGFORTURN;
    this.spymaster = null;
    this.operatives = [];
    this.guessCount = -1;
    this.cardsRemaining = (this.name == Term.Team.RED) ? 8 : 7;
  }
}