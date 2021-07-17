//model
import Team from "../Team";
import Player from "../Player";
import Operative from "../Operative";
import Spymaster from "../Spymaster";
import Card from "../Card";
// interface
import ITable from "../../interfaces/ITable";
import ITeam from "../../interfaces/ITeam";
import ISpymaster from "../../interfaces/ISpymaster";
import IOperative from "../../interfaces/IOperative";
import ICard from "../../interfaces/ICard";
import Table from "../Table";

export default class ConvertJson {

  public static toTable(table: ITable): Table {
    let convertedData: Table = new Table();
    convertedData.setPlayers(this.toPlayers(table.players) as (Spymaster | Operative)[]);
    convertedData.redTeam = this.toTeam(table.redTeam);
    convertedData.blueTeam = this.toTeam(table.blueTeam);
    convertedData.setGamePhase(table.phase);
    convertedData.cards = this.toCards(table.cards);
    return convertedData;
  }

  // team
  public static toTeam(team: ITeam): Team {
    let convertedData: Team = new Team(team.name);
    convertedData.setSpymaster(this.toSpymaster(team.spymaster));
    convertedData.setOperative(this.toPlayers(team.teamMembers) as Operative[]);
    convertedData.setPhase(team.phase);
    convertedData.setGuessCount(team.guessCount);
    convertedData.setCardsRemaining(team.cardsRemaining);
    return convertedData;
  }

  // players or operatives
  public static toPlayers(jsonData: (ISpymaster | IOperative)[] | null): (Spymaster | Operative)[] | null {
    if (!jsonData) return null;
    return jsonData.map(player => {
      if (player.role == "OPERATIVE") return this.toOperative(player) as Operative;
      else return this.toSpymaster(player as ISpymaster) as Spymaster;
    });
  }

  public static toPlayer(jsonData: ISpymaster | IOperative): Spymaster | Operative {
    return jsonData.role == "OPERATIVE" ? this.toOperative(jsonData as IOperative) as Operative : this.toSpymaster(jsonData as ISpymaster) as Spymaster;

  }

  // operative
  public static toOperative(operative: IOperative): Operative | null {
    if (!operative) return null;
    return new Operative(operative.name, operative.id, operative.role, operative.team);
  }

  // spymaster
  public static toSpymaster(spymaster: ISpymaster | null): Spymaster | null {
    if (!spymaster) return null;
    let convertedData = new Spymaster(spymaster.name, spymaster.id, spymaster.role, spymaster.team);
    convertedData.setClue(spymaster.clue);
    return convertedData;
  }

  // card
  public static toCard(card: ICard): Card {
    return new Card(card.team, card.word);
  }

  public static toCards(cards: ICard[]): Card[] {
    return cards.map(card => {
      return this.toCard(card);
    });
  }
}