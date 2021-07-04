import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import config from './config/config';
// models
import Table from "./models/Table";
import Team from "./models/Team";
import Operative from "./models/Operative";
// db
import db from './config/db';
import { testDBConnection } from "./test/db_connection";
import { db_synchronization } from "./config/db_synchronization";
import { player_find, player_findAll, player_insert, player_delete, player_update } from "./controllers/queries/PlayersQuery";
import { table_find, table_insert, table_update, table_delete } from "./controllers/queries/TablesQuery";
import { Words_get } from "./controllers/queries/wordsQuery";
import { roomId_find, roomId_insert, roomId_delete } from "./controllers/queries/RoomIdsQuery";

import PlayersInstance from "./interfaces/schema/Players";

const app = express();
const port = config.server.port || "3001";
const host = config.server.host || "localhost";

//Synchronizing database 
db_synchronization();
//test db connection
testDBConnection();

//socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

//home page
io.on('connection', (socket) => {
  console.log("connected", "new player is connected");
  socket.on('disconnect', () => {
    console.log('player disconnected');
  });
});

//game
io.of("/game").on("connection", (socket) => {
  console.log("connected in game page");
  socket.on("store-roomId", (roomId: string) => {
    roomId_insert(roomId);
    let table: Table = new Table();
    // register table in DB
    table_insert(roomId, JSON.stringify(table));
  });

  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);

  });

  socket.on("create-table", (roomId: string) => {
    // if table doesn't exist in the room, create a new table.
    let table: Table = new Table();
    // register table in DB
    table_insert(roomId, JSON.stringify(table));
  });

  socket.on("recieve-table", (roomId: string) => {
    let table: Table = new Table();
    table_find(roomId)
      .then(data => {
        table = Object.assign(JSON.parse(data!.table), new Table());
      }).catch(() => {
        console.log("table was found")
      });
    // send a table to frontend
    io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
  })

  socket.on("create-player", (roomId) => {
    const player = new Operative("", socket.id, "no team");
    // store player in db
    player_insert(socket.id, roomId, JSON.stringify(player));
  });

  socket.on("update-playerName", (playerName: string) => {
    let player: Operative = new Operative("", "", "");
    player_find(socket.id)
      .then(data => {
        player = Object.assign(JSON.parse(data!.player), new Operative("", "", ""));
      }).catch(() => {
        console.log("could not find a player");
      });
    player.setName(playerName);
    // store player in db
    player_update(socket.id, JSON.stringify(player));
    //send json data to the client
    socket.emit("recieve-player", JSON.stringify(player));
  });

  socket.on("add-player-to-table", (roomId: string) => {
    let table: Table = new Table(); //null or table class
    table_find(roomId)
      .then(data => {
        table = Object.assign(JSON.parse(data!.table), new Table());
      }).catch(() => {
        console.log("table was found")
      });
    player_find(socket.id)
      .then(data => {
        const player: Operative = Object.assign(JSON.parse(data!.player), new Operative("", "", ""));
        // get player in the table class
        table.addPlayer(player);
        // get player in the team
        table.addPlayerToTeam(player);
        // update table in db
        table_update(roomId, JSON.stringify(table));
        // send a table to frontend
        io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
      }).catch(() => {
        console.log("could not find a player");
      });
  })

  socket.on("recieve-player", () => {
    player_find(socket.id)
      .then(data => {
        socket.emit("recieve-player", JSON.stringify(data!.player));
      })
      .catch(() => {
        console.log("could not find a player");
      });
  })

  socket.on("card-clicked", (roomId: string) => {
    io.of("/game").in(roomId).emit("card-clicked");
  })

  socket.on("start-game", () => {

  });

  socket.on('disconnect', () => {
    socket.emit("delete-player", socket.id);

    console.log('player disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
