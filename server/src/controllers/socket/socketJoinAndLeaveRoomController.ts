import { Socket } from "socket.io";
// model
import Table from "../../models/Table";
import ConvertJson from "../../models/convertJson";
// interface
import IPlayer from "../../interfaces/IPlayer";
import PlayersInstance from "../../interfaces/schema/Players";
import TablesInstance from "../../interfaces/schema/Tables";
// queries
import { player_delete, player_find, player_findAll, player_socketId_update } from "../queries/PlayersQuery";
import { table_find, table_update } from "../queries/TablesQuery";
import { roomId_delete } from "../queries/RoomIdsQuery";

const socketJoinRoomController = (io: any, socket: Socket): void => {
  socket.once("join-room", async (roomId: string, playerId: string, playerName: string) => {
    socket.join(roomId);
    const playerData: PlayersInstance | null = await player_find(playerId);
    if (playerData) {
      await player_socketId_update(playerId, socket.id);
    } else {
      // send join message 
      const message: string = `${playerName} joined :)`;
      io.in(roomId).emit("receive-message", message);
    }
  });

  socket.once("leave-room", async (roomId: string, playerId: string) => {
    /* ※ This event doesn't run when Closing a tab. If Player did it, table should not be updated. 
          In order to remove player, it is necessary to hit the kicking button.
    */
    try {
      const playersData: PlayersInstance[] | [] = await player_findAll(roomId);
      if (playersData.length <= 1) {
        //If players don't exist in room, delete a roomId.
        await roomId_delete(roomId);
        return;
      }

      const playerData: PlayersInstance | null = await player_find(playerId);
      if (!playerData) throw Error("not found playerData");

      const player: IPlayer = JSON.parse(playerData.get("player"));

      // delete session of the player kicked out of the game
      const socketId: string = playerData.get("socketId");

      io.to(socketId).emit("delete-session");

      // send a message to others
      const message: string = `${player.name} left :(`;
      io.to(roomId).emit("receive-message", message);

      // delete player data from db
      await player_delete(playerId);

      const tableData: TablesInstance | null = await table_find(roomId);
      if (!tableData) throw Error("table was not found");

      let table: Table = new Table();
      table = ConvertJson.toTable(JSON.parse(tableData.get("table")));

      // delete player from table
      table.deletePlayerFromPlayers(player);
      table.deletePlayerFromTeam(player);

      // send table data to other players 
      io.to(roomId).emit("receive-table", JSON.stringify(table));

      // update table
      const updateResult = await table_update(roomId, JSON.stringify(table));
      if (!updateResult) throw Error("could not update table");

    } catch (err) {
      console.log(err);
    }
  });
}

export default socketJoinRoomController;