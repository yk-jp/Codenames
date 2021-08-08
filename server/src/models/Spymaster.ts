// config
import Term from '../config/term';
// abstract class
import Player from './Player';

export default class Spymaster extends Player {
  constructor(name: string, id: string, team: string) {
    super(name, id, team);
    this.role = Term.Role.SPYMASTER;
  }
}