// model
import Table from "../../models/Table";
import Operative from "../../models/Operative";
import Spymaster from "../../models/Spymaster";
import ConvertJson from "../../models/utils/convertJson";
import PlayersInstance from "../../interfaces/schema/Players";
// query
import { player_find } from "../../controllers/queries/PlayersQuery";

const socketPlayerController = (io: any, socket: any): void => {
  socket.on("receive-player", async (playerId: string) => {
    try {
      console.log({ "playerId": playerId });
      const playerData: PlayersInstance | null = await player_find(playerId);
      if (!playerData) throw new Error("player was not found");
      const player: Spymaster | Operative = ConvertJson.toPlayer(JSON.parse(playerData.get("player")));
      socket.emit("receive-player", JSON.stringify(player));
    } catch (err) {
      console.log(err);
    }
  })
}

export default socketPlayerController;
