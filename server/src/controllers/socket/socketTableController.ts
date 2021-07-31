import { Socket } from "socket.io";
// model
import Table from "../../models/Table";
import TablesInstance from "../../interfaces/schema/Tables";
import WordsInstance from "../../interfaces/schema/Words";
import ConvertJson from "../../models/utils/convertJson";
// query
import { table_find, table_update } from '../queries/TablesQuery'
import { words_findAll } from "../queries/wordsQuery";

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

      io.in(roomId).emit("receive-table", JSON.stringify(table));
      // update table data in db.
      await table_update(roomId, JSON.stringify(table));
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("reset-game", async (roomId: string) => {
    // try {
    //   const tableData: TablesInstance | null = await table_find(roomId);
    //   if (!tableData) throw new Error("table was not found");
    //   const table: Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));

    //   io.in(roomId).emit("receive-table", JSON.stringify(table));

    //   // reset spymaster
    //   io.in(roomId).emit("activate-spymaster");
    //   // update table
    //   await table_update(roomId, JSON.stringify(table));
    // } catch (err) {
    //   console.log(err);
    // }
  });
};

export default socketTableController;
