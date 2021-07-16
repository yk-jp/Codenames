export default class Player {
  protected name: string;
  protected id: string; //playerId
  protected role:string; // operative or spymaster. to detect the role in frontend
  protected team: string;
  constructor(name: string, id: string, role:string,team: string) {
    this.name = name;
    this.id = id;
    this.role = role;
    this.team = team;
  }

  public getPlayerInfo() {
    return {
      name: this.getName(), id: this.getId(), role:this.getRole(), team: this.getTeam()
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

  public getRole():string { 
    return this.role;
  }

  public getTeam(): string {
    return this.team;
  }

  //to change team if necessary.
  public setTeam(team: string): void {
    this.team = team;
  }
}