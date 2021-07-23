import express from "express";
import http from "http";
import config from './config/config';
import cors from 'cors';
// socket
import { Server, Socket } from "socket.io";
import socketDisconnectionController from "./controllers/socket/socketDisconnectionController";
import socketInitializeTableAndPlayerController from "./controllers/socket/socketInitializeTableAndPlayerController";
import socketRoomIdController from "./controllers/socket/socketRoomIdController";
import socketJoinAndLeaveRoomController from "./controllers/socket/socketJoinAndLeaveRoomController";
import socketTableController from "./controllers/socket/socketTableController";
import socketPlayerController from "./controllers/socket/socketPlayerController";
// routes
import nameFormRoutes from './Routes/nameFormRoutes';
// db
import { db_synchronization } from "./config/db_synchronization";

const app = express();
const port = config.server.port || "3001";
const host = config.server.host || "localhost";

//Synchronizing database 
db_synchronization();

// It's for the express router
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/form', nameFormRoutes);

//socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true
  }
});

const gameIO = io.of("/game");

//game
gameIO.on("connection", (socket: Socket) => {
  console.log("connected in game page");
  // roomId controller
  socketRoomIdController(io, socket);
  // join room controller
  socketJoinAndLeaveRoomController(io, socket);
  // initialize for table and player
  socketInitializeTableAndPlayerController(io, socket);
  //table controller
  socketTableController(io, socket);
  // player controller
  socketPlayerController(io, socket);
  // disconnection controller
  socketDisconnectionController(io, socket);
});

server.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
