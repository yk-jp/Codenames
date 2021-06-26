import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import db from './config/db';
import config from './config/config';
// models
import Table from "./models/Table";

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
  console.log(socket);

  // create table
  // const table =  new Table();



  // socket.on("create-room", (id: string | null) => {
  //   if (!id) return;
  //   socket.join(id);
  //   socket.to(id).emit("enter-room", id);
  // });

  socket.on("join-room", (id: string) => {
    if (true) socket.join(id);
    else console.log("no room");
    console.log("player entered");


  });

  socket.on("start-game", () => {

  });
});

server.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});

