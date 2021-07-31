import { Socket } from "socket.io";
// model
import Operative from "../../models/Operative";
import Spymaster from "../../models/Spymaster";
import ConvertJson from "../../models/utils/convertJson";
import PlayersInstance from "../../interfaces/schema/Players";
// query
import { player_find } from "../../controllers/queries/PlayersQuery";
//interface
import IOperative from "../../interfaces/IOperative";

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

  socket.on("activate-spymaster", async (playerString: string, roomId: string) => {
    const player: IOperative = JSON.parse(playerString);
    const team: string = (player.team === "RED") ? "RED" : "BLUE";
    socket.to(roomId).emit("activate-spymaster", team);
  });

  socket.on("set-spymaster", async () => {


  });
}

export default socketPlayerController;
