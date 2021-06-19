"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(name, team) {
        this.name = name;
        this.team = team;
    }
    getName() {
        return this.name;
    }
    getTeam() {
        return this.team;
    }
    setTeam(team) {
        this.team = team;
    }
}
exports.default = Player;
