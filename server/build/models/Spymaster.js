"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./Player"));
class Spymaster extends Player_1.default {
    constructor(name, team) {
        super(name, team);
    }
}
exports.default = Spymaster;
