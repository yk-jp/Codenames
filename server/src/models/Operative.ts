// class
import Player from './Player';
import IOperative from '../interfaces/IOperative';
export default class Operative extends Player {

  constructor(name: string, id: string, role: string, team: string) {
    super(name, id, role, team);
  }
}