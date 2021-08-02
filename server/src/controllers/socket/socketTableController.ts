import { Socket } from "socket.io";
// model
import Table from "../../models/Table";
import Spymaster from "../../models/Spymaster";
import Operative from "../../models/Operative";
import TablesInstance from "../../interfaces/schema/Tables";
import WordsInstance from "../../interfaces/schema/Words";
import PlayersInstance from "../../interfaces/schema/Players";
import ConvertJson from "../../models/utils/convertJson";
// query
import { table_find, table_update } from '../queries/TablesQuery'
import { words_findAll } from "../queries/wordsQuery";
import { player_find, player_update } from "../queries/PlayersQuery";

// interface
import IClue from "../../interfaces/IClue";
const socketTableController = (io: any, socket: Socket) => {
  //  table controller 
  socket.on("receive-table", async (roomId: string) => {
    try {
      const tableData: TablesInstance | null = await table_find(roomId);

      if (!tableData) throw new Error("table was not found");

      const table: Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));
      socket.emit("receive-table", JSON.stringify(table));
    } catch (err) {
      console.log(err);
    }
  })

  socket.on("give-a-clue", async (roomId: string, clueString: string) => {
    const clue: IClue = JSON.parse(clueString);
    try {
      const tableData: TablesInstance | null = await table_find(roomId);
      if (!tableData) throw new Error("table was not found");
      const table: Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));

      // change phase of the team the player belongs to. 
      table.haveTurn(clue);

      // update table data in db.
      await table_update(roomId, JSON.stringify(table));

      io.in(roomId).emit("receive-table", JSON.stringify(table));
      socket.to(roomId).emit("alert-message", `${clue.word} ${clue.number}`);
    } catch (err) {
      console.log(err);
    }
  });

  //card language
  socket.on("change-card-language", (cardLanguage: string, roomId: string) => {
    io.in(roomId).emit("change-card-language", cardLanguage);
  });

  socket.on("shuffle-members", async (roomId: string) => {
    try {
      const tableData: TablesInstance | null = await table_find(roomId);

      if (!tableData) throw new Error("table was not found");

      const table: Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));
      table.shuffleMembers();
      io.in(roomId).emit("receive-table", JSON.stringify(table));
      io.in(roomId).emit("activate-spymaster");
      // update table
      await table_update(roomId, JSON.stringify(table));
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("start-game", async (roomId: string, cardLanguage: string) => {
    try {
      const tableData: TablesInstance | null = await table_find(roomId);
      if (!tableData) throw new Error("table was not found");
      const table: Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));

      // fetch card 
      const wordsData: WordsInstance[] | null = await words_findAll(cardLanguage);

      if (!wordsData) throw new Error("could not fetch 25 words");

      // update cards
      table.updateCards(wordsData);

      // change gameStatus
      table.chanegGameStatus();

      // update table data in db.
      await table_update(roomId, JSON.stringify(table));

      io.in(roomId).emit("receive-table", JSON.stringify(table));
      //send alert for red team to set a spymaster
      const message: string = "SELECT A SPYMASTER";
      io.in(roomId).emit("alert-for-spymaster", message);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("reset-game", async (roomId: string) => {
    try {
      const tableData: TablesInstance | null = await table_find(roomId);
      if (!tableData) throw new Error("table was not found");
      const table: Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));

      // update players if the player is a spymaster.
      const operatives: Operative[] = table.changeSpymastersToOperatives();
      // update players that had a role of spymaster
      operatives.map(async (operative) => {
        const playerId: string = operative.getId();
        // update player from spymaster
        console.log(operatives);
        await player_update(JSON.stringify(operative), playerId);
        const playerData: PlayersInstance | null = await player_find(playerId);
        if (playerData) {
          // send playerData
          const socketId: string = playerData.get("socketId");
          io.to(socketId).emit("receive-player", JSON.stringify(operative));
        }
      });

      // reset table
      table.resetTable();

      io.in(roomId).emit("receive-table", JSON.stringify(table));

      // reset spymaster
      io.in(roomId).emit("reset-spymaster");
      // update table
      await table_update(roomId, JSON.stringify(table));
    } catch (err) {
      console.log(err);
    }
  });
};

export default socketTableController;
