import Table from "../../models/Table";
import Operative from "../../models/Operative";
import Spymaster from "../../models/Spymaster";
const table = new Table();
const playerId1 = "id1";
const playerId2 = "id2";
const playerId3 = "id3";
const playerId4 = "id4";
const playerId5 = "id5";
const playerId6 = "id6";
const playerId7 = "id7";
const playerId8 = "id8";
// operative
const player1 = new Operative("test1", playerId1, "OPERATIVE", "RED");
const player2 = new Operative("test2", playerId2, "OPERATIVE", "RED");
const player3 = new Operative("test3", playerId3, "OPERATIVE", "RED");
const player4 = new Operative("test4", playerId4, "OPERATIVE", "RED");
const player5 = new Operative("test5", playerId5, "OPERATIVE", "RED");
const player6 = new Operative("test6", playerId6, "OPERATIVE", "RED");
const operatives = [player1, player2, player3, player4, player5, player6];
// spymaster
const player7 = new Spymaster("test7", playerId7, "SPYMASTER", "RED");
const player8 = new Spymaster("test8", playerId8, "SPYMASTER", "RED");
const spymasters = [player7, player8];

// After all players left in a room
describe('leave-room', () => {
  test('delete a player from the table', async () => {
    table.addPlayer(player1);
    table.addPlayer(player2);
    //The number of the players added in the table.
    expect(table.getPlayers().length).toBe(2);

    let jsonString = JSON.stringify(player1);
    let IPlayer1 = JSON.parse(jsonString);

    const result = table.deletePlayerFromPlayers(IPlayer1);

    expect(table.getPlayers().length).toBe(1);

    //Deleted players from the table is the same as player1
    expect(JSON.stringify(result)).toBe(JSON.stringify(player1));
  });

  test('delete a player from the team', async () => {
    let testTable = new Table();

    operatives.map((operative) => {
      testTable.addPlayer(operative);
      testTable.addPlayerToTeam(operative);
    });

    let jsonString = JSON.stringify(operatives[3]);
    let IPlayer4 = JSON.parse(jsonString);
    const result = testTable.deletePlayerFromTeam(IPlayer4);
    expect(JSON.stringify(result)).toBe(JSON.stringify(IPlayer4));
  });


})
