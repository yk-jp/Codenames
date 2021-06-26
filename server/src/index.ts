import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import db from './config/db';
import config from './config/config';
// models
import Table from "./models/Table";
import Team from "./models/Team";
import Operative from "./models/Operative";


const app = express();
const port = config.server.port || "3001";
const host = config.server.host || "localhost";

//socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

//test db connection
db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));


//home page
io.on('connection', (socket) => {
  console.log("connected", "new user is connected");

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//game
io.of("/game").on("connection", (socket) => {
  console.log("connected in game page");
  const table = new Table(new Team("RED"), new Team("BLUE"));
  socket.on("join-room", (id: string) => {
    socket.join(id);
  });

  // as a first player got in the room, the table has to be created only once and shared in the room. 
  socket.once("create-table", (roomId: string) => {
    
    socket.in(roomId).emit("create-table", () => {
      return new Table(new Team("RED"), new Team("BLUE"));
    });

  });


  // If players set their name, add players to table class 
  socket.on("add-player", (name: string, team: string, roomId: string) => {
    table.redTeam.addPlayer(new Operative(name, socket.id, team));
    console.log(table);
    io.of("/game").in(roomId).emit("test");
  })

  socket.on("start-game", () => {

  });
});

server.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});

