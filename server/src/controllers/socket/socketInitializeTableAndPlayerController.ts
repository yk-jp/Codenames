import { Socket } from "socket.io";
// model
import Table from "../../models/Table";
import Operative from "../../models/Operative";
import ConvertJson from "../../models/convertJson";
// interface
import TablesInstance from "../../interfaces/schema/Tables";
import PlayersInstance from "../../interfaces/schema/Players";
// queries
import { table_find, table_insert, table_update } from '../queries/TablesQuery'
import { player_insert } from "../queries/PlayersQuery";

const socketInitializeTableAndPlayerController = (io: any, socket: Socket) => {
  //  table controller 
  socket.once("initialize-table-and-player", async (roomId: string, playerName: string, playerId: string) => {
    const tableData: TablesInstance | null = await table_find(roomId);
    let table: Table = new Table();
    let player: Operative = new Operative(playerName, playerId, "NO TEAM");
    if (tableData) table = ConvertJson.toTable(JSON.parse(tableData.get("table")));
    table.addPlayer(player);
    table.addPlayerToTeam(player);

    try {
      // store a player data
      const result: PlayersInstance | null = await player_insert(playerId, roomId, socket.id, JSON.stringify(player));

      if (!result) throw new Error("couldn't store a player");
    } catch (err) {
      console.log(err);
    }

    // If table already exsits, update it. if not, store it.
    if (tableData) {
      try {
        const result = await table_update(roomId, JSON.stringify(table));

        if (!result) throw Error("fail");
      } catch (err) {
        console.log(err);
      }
    }
    else await table_insert(roomId, JSON.stringify(table));

    io.in(roomId).emit("receive-table", JSON.stringify(table));
    socket.emit("receive-player", JSON.stringify(player));
    socket.emit("initialize-table-and-player", "initialized");
  })
};

export default socketInitializeTableAndPlayerController;
