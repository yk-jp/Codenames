// config
import Term from '../config/Term';
// class
import Player from './Player';
export default class Operative extends Player {
  constructor(name: string, id: string, team: string) {
    super(name, id, team);
    this.role = Term.Role.OPERATIVE;
  }
}