export default class Player {
  protected name: string;
  protected id: string; //socket.id
  protected team: string;
  constructor(name: string, id: string, team: string) {
    this.name = name;
    this.id = id;
    this.team = team;
  }

  public getPlayerInfo() {
    return {
      name: this.getName(), id: this.getId(), team: this.getTeam()
    };
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

  public getTeam(): string {
    return this.team;
  }

  //to change team if necessary.
  public setTeam(team: string): void {
    this.team = team;
  }
}