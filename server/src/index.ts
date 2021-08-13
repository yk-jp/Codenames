import express from "express";
import http from "http";
// config
import config from './config/config';
import initializeWordList from "./config/initializeWord";
import cors from 'cors';
import schedule from 'node-schedule';
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
// scheduling jobs
import { cronJobs } from "./controllers/cronJobs/cronJobs";

const app = express();

//Synchronizing database 
db_synchronization();

// initialize wordlist in db
// initializeWordList();

/* Scheduling jobs 
   clean up database table every 4 hours
*/
schedule.scheduleJob('0 */4 * * *', cronJobs);

// It's for the express router
app.use(cors({
  origin: config.client.name,
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
    origin: [config.client.name],
    credentials: true
  }
});

const gameIO = io.of("/game");

//game
gameIO.on("connection", (socket: Socket) => {
  console.log("connected in game page");
  // roomId controller
  socketRoomIdController(gameIO, socket);
  // join room controller
  socketJoinAndLeaveRoomController(gameIO, socket);
  // initialize for table and player
  socketInitializeTableAndPlayerController(gameIO, socket);
  //table controller
  socketTableController(gameIO, socket);
  // player controller
  socketPlayerController(gameIO, socket);
  // disconnection controller
  socketDisconnectionController(gameIO, socket);
});

server.listen(config.server.port, () => {
  console.log(`Server listening at ${config.server.port}`);
});
