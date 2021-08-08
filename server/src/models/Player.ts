export default abstract class Player {
  protected name: string;
  protected id: string; //playerId
  protected role: string;
  protected team: string;
  constructor(name: string, id: string, team: string) {
    this.name = name;
    this.id = id;
    this.team = team;
    this.role = "";
  }

  public getName(): string {
    return this.name;
  }

  public setName(playerName: string): void {
    this.name = playerName;
  }

  public getId(): string {
    return this.id;
  }

  public getRole(): string {
    return this.role;
  }

  public getTeam(): string {
    return this.team;
  }

  public setTeam(team: string): void {
    this.team = team;
  }
}