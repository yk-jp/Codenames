import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import db from './config/db';
import config from './config/config';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = config.server.port || "3001";
const host = config.server.host || "localhost";

//socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000", methods: ["GET"] } });

//test db connection
db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));


//home page
io.on('connection', (socket) => {
  console.log("connected", socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//lobby
io.of("/lobby").on("connection", (socket) => {
  console.log("connected in Lobby Page");

  socket.on("create-room", (id:string) => {
    socket.join(id);
    socket.to(id).emit("joined-in", id);
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});

