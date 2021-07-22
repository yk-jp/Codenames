// model
import Table from "../../models/Table";
import Operative from "../../models/Operative";
import ConvertJson from "../../models/utils/convertJson";
// interface
import TablesInstance from "../../interfaces/schema/Tables";
// query
import { table_find, table_insert, table_update } from '../queries/TablesQuery'
import { player_insert } from "../queries/PlayersQuery";
import PlayersInstance from "../../interfaces/schema/Players";

const socketInitializeTableAndPlayerController = (io: any, socket: any) => {
  //  table controller 
  socket.once("initialize-table-and-player", async (roomId: string, playerName: string, playerId: string) => {
    const tableData: TablesInstance | null = await table_find(roomId);
    let table: Table = new Table();
    let player: Operative = new Operative(playerName, playerId, "OPERATIVE", "NO TEAM");
    if (tableData) table = ConvertJson.toTable(JSON.parse(tableData.get("table")));

    table.addPlayer(player);
    table.addPlayerToTeam(player);

    // store a player data
    try {
      const result: PlayersInstance | null = await player_insert(playerId, roomId, JSON.stringify(player));

      if (!result) throw new Error("couldn't store a player");
    } catch (err) {
      console.log(err);
    }

    // If table already exsits, update it. if not, store it.
    if (tableData) await table_update(roomId, JSON.stringify(table));
    else await table_insert(roomId, JSON.stringify(table));

    io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
    socket.emit("receive-player", JSON.stringify(player));
    socket.emit("initialize-table-and-player", "initialized");
  })
};

export default socketInitializeTableAndPlayerController;