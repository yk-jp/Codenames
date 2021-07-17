import Table from "../../models/Table";
import Operative from "../../models/Operative";
import ConvertJson from "../../models/utils/convertJson";
import { table_find, table_insert, table_update, table_delete } from '../queries/TablesQuery'
import { player_find, player_findAll, player_insert, player_delete, player_update } from "../../controllers/queries/PlayersQuery";

const socketInitializeTableAndPlayerController = (io: any, socket: any) => {
  //  table controller 
  socket.once("initialize-table-and-player", (roomId: string, playerName: string, playerId: string) => {
    let table: Table = new Table();
    console.log(roomId)
    console.log(socket.id)
    console.log(socket.request.sessionID);
    let player: Operative = new Operative(playerName, playerId, "OPERATIVE", "NO TEAM");
    table_find(roomId)
      .then(data => {
        table = ConvertJson.toTable(JSON.parse(data!.get("table")));
        player = table.addPlayer(player) as Operative;
        table.addPlayerToTeam(player);
        table_update(roomId, JSON.stringify(table));
        player_update(playerId, JSON.stringify(player));
        io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
        socket.emit("receive-player", JSON.stringify(player));
      }).catch(() => {
        console.log("table was not found");
        player = table.addPlayer(player) as Operative;
        table.addPlayerToTeam(player);
        table_insert(roomId, JSON.stringify(table));
        player_insert(playerId, roomId, JSON.stringify(player));
        io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
        socket.emit("receive-player", JSON.stringify(player));
      });

    socket.emit("initialize-table-and-player", "initialized");
  })
};

export default socketInitializeTableAndPlayerController;
