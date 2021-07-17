// model
import Table from "../../models/Table";
import Operative from "../../models/Operative";
import ConvertJson from "../../models/utils/convertJson";
// query
import { player_find, player_findAll, player_insert, player_delete, player_update } from "../../controllers/queries/PlayersQuery";
import { table_find, table_insert, table_update, table_delete } from "../../controllers/queries/TablesQuery";

const socketPlayerController = (io: any, socket: any): void => {
  socket.on("receive-player", (playerName: string, playerId: string, roomId: string) => {
    let player: Operative = new Operative(playerName, playerId, "OPERATIVE", "NO TEAM");
    player_find(playerId)
      .then(data => {
        player = ConvertJson.toPlayer(JSON.parse(data!.get("player")));
        socket.emit("receive-player", JSON.stringify(player));
      })
      .catch(() => {
        console.log("could not find a player");
      });
  })
}

export default socketPlayerController;
