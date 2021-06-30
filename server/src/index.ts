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
import { player_find, player_findAll, player_insert, player_delete } from "./controllers/queries/PlayersQuery";
import { table_find, table_insert, table_delete } from "./controllers/queries/TablesQuery";
import { Words_get } from "./controllers/queries/wordsQuery";
import { roomId_find, roomId_insert, roomId_delete } from "./controllers/queries/RoomIdsQuery";
import Tables from "./models/schema/Tables";


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
    let id = null;
    roomId_find(roomId).then(data => { id = data });
    if (id == null) roomId_insert(roomId);
  });

  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);
  });

  socket.on("create-table", (roomId: string) => {
    let table = null;
    table_find(roomId).then(data => { table = data });
    if (table == null) {
      console.log(table);
      // if table doesn't exist in the room, create a new table.
      const newTable: Table = new Table(new Team("RED"), new Team("BLUE"));
      // register table in DB
      table_insert(roomId, JSON.stringify(newTable));
      // send a table to frontend
      io.of("/game").in(roomId).emit("receive-table", JSON.stringify(newTable));
    }
  });

  socket.on("create-player", (playerName: string, roomId) => {
    let table: Table = Object(null) as Table;
    table_find(roomId).then(data => {
      table = Object.assign(new Table(new Team("RED"), new Team("BLUE")), data);
    });

    const player = new Operative(playerName, socket.id, "no team");
    // get player in the table class
    table.addPlayer(player);

    // get player in the team
    table.addPlayerToTeam(player);

    // store player in db
    player_insert(socket.id, roomId, JSON.stringify(player));
    // send json data to the client
    socket.emit("set-player", JSON.stringify(player));
  });



  socket.on("card-clicked", (roomId: string) => {
    io.of("/game").in(roomId).emit("card-clicked");
  })

  // If players set their name, add players to table class 
  socket.on("add-player", (name: string, team: string, roomId: string) => {
    socket.broadcast.to(roomId).emit("test");
  })

  socket.on("start-game", () => {

  });

  socket.on('disconnect', () => {
    // if player disconnected, check if some players still join in the room.
    let player = null;


    console.log('player disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
