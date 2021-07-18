// model
import Table from "../../models/Table";
import Operative from "../../models/Operative";
import ConvertJson from "../../models/utils/convertJson";
import TablesInstance from "../../interfaces/schema/Tables";
// query
import { table_find, table_insert, table_update } from '../queries/TablesQuery'
import { player_insert } from "../../controllers/queries/PlayersQuery";

const socketInitializeTableAndPlayerController = (io: any, socket: any) => {
  //  table controller 
  socket.once("initialize-table-and-player", async (roomId: string, playerName: string, playerId: string) => {
    const tableData: TablesInstance | null = await table_find(roomId);
    let table: Table = new Table();
    let player: Operative = new Operative(playerName, playerId, "OPERATIVE", "NO TEAM");
    if (tableData) table = ConvertJson.toTable(JSON.parse(tableData.get("table")));

    player = table.setTeam(player);
    table.addPlayer(player);
    table.addPlayerToTeam(player);

    // store a player data
    player_insert(playerId, roomId, JSON.stringify(player));

    // If table already exsits, update it. if not, store it.
    if (tableData) table_update(roomId, JSON.stringify(table));
    else table_insert(roomId, JSON.stringify(table));

    io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
    socket.emit("receive-player", JSON.stringify(player));
    socket.emit("initialize-table-and-player", "initialized");
  })
};

export default socketInitializeTableAndPlayerController;
