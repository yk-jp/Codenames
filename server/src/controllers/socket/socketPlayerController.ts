// model
import Table from "../../models/Table";
import Operative from "../../models/Operative";
// query
import { player_find, player_findAll, player_insert, player_delete, player_update } from "../../controllers/queries/PlayersQuery";
import { table_find, table_insert, table_update, table_delete } from "../../controllers/queries/TablesQuery";

const socketPlayerController = (io: any, socket: any): void => {
  socket.once("store-player", (playerName: string, playerId: string, roomId: string) => {
    let table: Table = new Table();
    let player: Operative = new Operative(playerName, playerId, "OPERATIVE", "NO TEAM");
    table_find(roomId)
      .then(data => {
        table = Object.assign(JSON.parse(data!.get("table")), new Table());

      }).catch(() => {
        console.log("table was not found");
      });
    table.addPlayer(player);
    table.addPlayerToTeam(player);
    // table update
    table_update(roomId, JSON.stringify(table));
    //store player
    player_insert(playerId, roomId, JSON.stringify(player));

    io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
    socket.emit("receive-player", JSON.stringify(player));
  });
}

export default socketPlayerController;
