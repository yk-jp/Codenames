import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import db from './config/db';
import config from './config/config';

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

// app.use(express.static(__dirname + '/public')); 

io.on('connection', (socket) => {
  console.log("connected", socket.id);
  socket.emit("hello","world");

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});

