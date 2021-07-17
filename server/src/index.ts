import express, { urlencoded } from "express";
import http from "http";
import config from './config/config';
import cors from 'cors';
// socket
import { Server, Socket } from "socket.io";
import { socketConnection } from "./controllers/socket/socketConnectionController";
import socketInitializeTableAndPlayerController from "./controllers/socket/socketInitialize";
import socketRoomIdController from "./controllers/socket/socketRoomIdController";
import socketJoinRoomController from "./controllers/socket/socketJoinRoomController";
import socketTableController from "./controllers/socket/socketTableController";
import socketPlayerController from "./controllers/socket/socketPlayerController";
// session
import session from 'express-session';
import sessionStore from "./models/schema/Sessions";
// models
import Table from "./models/Table";
import Team from "./models/Team";
import Operative from "./models/Operative";
// routes
import nameFormRoutes from './Routes/nameFormRoutes';

// db
import db from './config/db';
import { testDBConnection } from "./test/db_connection";
import { db_synchronization } from "./config/db_synchronization";
import { player_find, player_findAll, player_insert, player_delete, player_update } from "./controllers/queries/PlayersQuery";
import { table_find, table_insert, table_update, table_delete } from "./controllers/queries/TablesQuery";
import { Words_get } from "./controllers/queries/wordsQuery";
import { roomId_find, roomId_insert, roomId_delete } from "./controllers/queries/RoomIdsQuery";

const app = express();
const port = config.server.port || "3001";
const host = config.server.host || "localhost";

//Synchronizing database 
db_synchronization();
//test db connection
testDBConnection();

// It's for the express router
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 60 * 60 * 1000 * 5
  }
});

// register middleware in Express
app.use(sessionMiddleware);

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

const wrapper = (middleware: any) => (socket: Socket, next: any) => middleware(socket.request, {}, next);

gameIO.use(wrapper(sessionMiddleware));

//game
gameIO.on("connection", (socket: any) => {
  console.log("connected in game page");

  // roomId controller
  socketRoomIdController(io, socket);
  // join room controller
  socketJoinRoomController(io, socket);
  // initialize for table and player
  socketInitializeTableAndPlayerController(io,socket);
  //table controller
  socketTableController(io, socket);

  // player controller
  socketPlayerController(io, socket);
  socket.on("update-table", (roomId: string, table: string | null) => {
    if (table) table_update(roomId, table);
  })
  socket.on("update-player", (player: string | null) => {
    if (player) player_update(player, socket.data.playerId);
  });

  socket.on('disconnect', () => {
    socketConnection.disconnect(socket);
  });

});

server.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
