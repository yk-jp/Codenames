// interface
import PlayersInstance from "../../interfaces/schema/Players";
// query
import { player_findAll } from "../queries/PlayersQuery";
import { roomId_delete } from "../queries/RoomIdsQuery";
const socketDisconnectionController = (io: any, socket: any) => {
  socket.on("disconnect", async () => {
    console.log('player disconnected');
    // before closing session, need to delete a player data form db.
  });

  socket.on("check-player-in-room", async (roomId: string) => {
    try {
      const playersData: PlayersInstance[] = await player_findAll(roomId);
      
      if (!playersData) roomId_delete(roomId);//If players don't exist in room, delete a roomId.
    } catch (err) {
      console.log(err);
    }
  });
}



export default socketDisconnectionController;