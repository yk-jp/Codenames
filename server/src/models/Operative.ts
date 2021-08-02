// class
import Player from './Player';
export default class Operative extends Player {
  constructor(name: string, id: string, role:string="OPERATIVE", team: string) {
    super(name, id, role, team);
  }
}