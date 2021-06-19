export default class Player {
  protected name: string;
  protected team: string;
  constructor(name: string, team: string) {
    this.name = name;
    this.team = team;
  }

  public getName(): string {
    return this.name;
  }

  public getTeam(): string {
    return this.team;
  }

  public setTeam(team: string): void {
    this.team = team;
  }
}