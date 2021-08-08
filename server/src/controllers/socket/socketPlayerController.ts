import { Socket } from "socket.io";
// model
import Operative from "../../models/Operative";
import Spymaster from "../../models/Spymaster";
import Table from "../../models/Table";
import ConvertJson from "../../models/convertJson";
import PlayersInstance from "../../interfaces/schema/Players";
import TablesInstance from "../../interfaces/schema/Tables";
// query
import { player_find, player_update } from "../../controllers/queries/PlayersQuery";
import { table_find, table_update } from "../queries/TablesQuery";

const socketPlayerController = (io: any, socket: Socket): void => {
  socket.on("receive-player", async (playerId: string) => {
    try {
      const playerData: PlayersInstance | null = await player_find(playerId);
      if (!playerData) throw new Error("player was not found");
      const player: Spymaster | Operative = ConvertJson.toPlayer(JSON.parse(playerData.get("player")));

      socket.emit("receive-player", JSON.stringify(player));
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("activate-spymaster", async (playerId: string, roomId: string) => {
    try {
      const tableData: TablesInstance | null = await table_find(roomId);
      const playerData: PlayersInstance | null = await player_find(playerId);
      if (!tableData) throw new Error("table was not found");
      if (!playerData) throw new Error("player was not found");
      const table: Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));
      // create instance of spymaster
      const player: Operative = ConvertJson.toPlayer(JSON.parse(playerData.get("player"))) as Operative;
      // set spymaster
      const spymaster: Spymaster = new Spymaster(player.getName(), player.getId(), player.getTeam());

      // other players become operative and they are in operatives list
      if (player.getTeam() === "RED") table.redTeam.dividePlayers(spymaster);
      else table.blueTeam.dividePlayers(spymaster);

      io.in(roomId).emit("activate-spymaster", spymaster.getTeam());
      socket.emit("receive-player", JSON.stringify(spymaster));

      io.in(roomId).emit("receive-table", JSON.stringify(table));

      // send a message 
      const message: string = `${spymaster.getName()} became a spymaster`;
      io.in(roomId).emit("receive-message", message);

      // update table
      await table_update(roomId, JSON.stringify(table));
      //  update player
      await player_update(JSON.stringify(spymaster), playerId);

    } catch (err) {
      console.log(err);
    }
  });
}

export default socketPlayerController;
