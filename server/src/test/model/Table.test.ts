import Table from "../../models/Table";
import Operative from "../../models/Operative";
import ConvertJson from "../../models/convertJson";
import { roomId_delete, roomId_find, roomId_insert } from "../../controllers/queries/RoomIdsQuery";
import { table_insert, table_find, table_update } from "../../controllers/queries/TablesQuery";
import { player_insert } from "../../controllers/queries/PlayersQuery";
import TablesInstance from "../../interfaces/schema/Tables";

describe('add player ', () => {
  let table: Table = new Table();
  let players = [new Operative("", "", ""), new Operative("", "", ""), new Operative("", "", ""), new Operative("", "", ""), new Operative("", "", ""), new Operative("", "", "")];
  let players1 = [new Operative("", "", ""), new Operative("", "", ""), new Operative("", "", ""), new Operative("", "", ""), new Operative("", "", ""), new Operative("", "", "")];
  test("give a team to each player", () => {
    players.map(player => {
      table.addPlayer(player);
      table.addPlayerToTeam(player);
      return player;
    });

    expect(table.getPlayers().length).toBe(players.length);

    const tableString = JSON.stringify(table);
    const newTable = ConvertJson.toTable(JSON.parse(tableString));
    // console.log(newTable);

    players1.map(player => {
      newTable.addPlayer(player);
      newTable.addPlayerToTeam(player);
      return player;
    });
    // console.log(newTable);
  });


  test('test ', async () => {
    const insert = await roomId_insert("test");
    console.log({ "insert": insert })
    const find = await roomId_find("test");
    console.log({ "find": find });
    const insertTable = await table_insert("test", JSON.stringify(new Table()));

    const findTable: TablesInstance | null = await table_find("test");
    console.log(findTable);

    const newTable: Table = ConvertJson.toTable(JSON.parse(findTable!.get("table")));

    players1.map(player => {
      newTable.addPlayer(player);
      newTable.addPlayerToTeam(player);
      return player;
    });

    const update = await table_update("test", JSON.stringify(newTable));

    const again: TablesInstance | null = await table_find("test");

    let aTable = ConvertJson.toTable(JSON.parse(again!.get("table")));
    console.log(aTable);
    expect(update).not.toBeNull();

    expect(insert).not.toBeNull();
    expect(find).not.toBeNull();

    // await roomId_delete("test");
  });

})
