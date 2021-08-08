import { Socket } from "socket.io";
// model
import Table from "../../models/Table";
import Operative from "../../models/Operative";
import TablesInstance from "../../interfaces/schema/Tables";
import WordsInstance from "../../interfaces/schema/Words";
import PlayersInstance from "../../interfaces/schema/Players";
import ConvertJson from "../../models/convertJson";
import Card from "../../models/Card";
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

  socket.on("give-a-clue", async (roomId: string, clueString: string, playerName: string) => {
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
      // send a message
      const message: string = `${playerName} gave clue "${clue.word} ${clue.number}" `;
      io.in(roomId).emit("receive-message", message);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("end-guess", async (roomId: string, playerName: string) => {
    try {
      const tableData: TablesInstance | null = await table_find(roomId);

      if (!tableData) throw new Error("table was not found");

      const table: Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));

      table.haveTurn("END GUESSING");

      io.in(roomId).emit("receive-table", JSON.stringify(table));

      //send alert for red team to set a spymaster
      if (table.redTeam.getPhase() === "GIVING A CLUE" || table.blueTeam.getPhase() === "GIVING A CLUE") {
        const alert: string = "SELECT A SPYMASTER";
        if (!table.redTeam.getSpymaster()) io.in(roomId).emit("alert-for-spymaster", alert, "RED");
        else if (!table.blueTeam.getSpymaster()) io.in(roomId).emit("alert-for-spymaster", alert, "BLUE");
      }

      // send a message 
      const message: string = `${playerName} ended guess`;
      io.in(roomId).emit("receive-message", message);

      // update table
      await table_update(roomId, JSON.stringify(table));
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("click-card", async (roomId: string, cardString: string, playerName: string) => {
    try {
      const tableData: TablesInstance | null = await table_find(roomId);

      if (!tableData) throw new Error("table was not found");

      const table: Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));
      const card: Card = ConvertJson.toCard(JSON.parse(cardString));
      table.haveTurn(card);

      io.in(roomId).emit("receive-table", JSON.stringify(table));

      //send alert for red team to set a spymaster

      if (table.redTeam.getPhase() === "GIVING A CLUE" || table.blueTeam.getPhase() === "GIVING A CLUE") {
        const alert: string = "SELECT A SPYMASTER";
        if (!table.redTeam.getSpymaster()) io.in(roomId).emit("alert-for-spymaster", alert, "RED");
        else if (!table.blueTeam.getSpymaster()) io.in(roomId).emit("alert-for-spymaster", alert, "BLUE");
      }

      // send a message 
      let message: string = `${playerName} clicked "${card.getWord()}"`;
      io.in(roomId).emit("receive-message", message);

      if (table.getGameStatus() === "END") {
        message =`${table.getGamePhase()} =D>`;
        io.in(roomId).emit("receive-message", message);
      }

      // update table
      await table_update(roomId, JSON.stringify(table));
    } catch (err) {
      console.log(err);
    }
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

      // send a message 
      const message: string = `game start!`;
      io.in(roomId).emit("receive-message", message);

      const alert: string = "SELECT A SPYMASTER";
      io.in(roomId).emit("alert-for-spymaster", alert, "RED");


    } catch (err) {
      console.log(err);
    }
  });

  socket.on("alert-for-spymaster", async () => {
    //send alert for red team to set a spymaster
    const message: string = "SELECT A SPYMASTER";
    socket.emit("alert-for-spymaster", message);
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
