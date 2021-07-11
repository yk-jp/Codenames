import express, { urlencoded } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import config from './config/config';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
// session
import session from 'express-session';
import sessionStore from "./models/schema/Sessions";
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
import { session_find, session_insert } from "./controllers/queries/SessionsQuery";
import { Words_get } from "./controllers/queries/wordsQuery";
import { roomId_find, roomId_insert, roomId_delete } from "./controllers/queries/RoomIdsQuery";
import { EROFS } from "constants";


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
    maxAge: 1000 * 60 * 60 * 12
  },
});

// register middleware in Express
app.use(sessionMiddleware);

//form page
app.post('/form', (req: any, res) => {
  console.log(req.session.isAuthenticated)
  if (!req.session.isAuthenticated) {
    //attach a player info to session 
    req.session.playerName = req.body.playerName.toString() as string;
    req.session.playerId = uuidv4();
    req.session.isAuthenticated = true;
    // save session
    req.session.save();
    res.end();
    // if (req.session.roomId) res.redirect(`/game/:${req.session.roomId}`);
    // else res.redirect(`/game/:${uuidv4()}`);  //if a player don't have a roomId, give a new roomId.
  }
  // error
  res.status(400).end();
});

//game page
app.get('/game/:roomId', (req: any, res) => {
  const roomId = req.params.roomId;
  if (!req.session.isAuthenticated) {
    // set roomId to be able to go to the game page again.
    req.session.roomId = roomId;
    res.end();
  }
});

//socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true
  }
});

// //home page
// io.on('connection', (socket) => {
//   console.log("connected", "new player is connected");
//   socket.on('disconnect', () => {
//     console.log('player disconnected');
//   });
// });

// const gameIO = io.of("/game");

// // execute middleware before connection 
// gameIO.use((socket, next) => {

// });

// //game
// gameIO.on("connection", (socket: any) => {
//   console.log("connected in game page");

//   socket.emit("session", {
//     sessionID: socket.data.sessionID,
//     playerID: socket.data.playerId,
//   });

//   socket.on("login", (playerName: string) => {
//     session_insert(socket.data.sessionID, socket.data.playerId);
//   });

//   socket.on("store-roomId", (roomId: string) => {
//     let isStored: boolean = false;
//     roomId_find(roomId)
//       .then(data => {
//         isStored = true;
//       }).catch(() => {
//       });
//     // if roomId doensn't exsit in the db, store a new roomId
//     if (!isStored) roomId_insert(roomId);
//     socket.emit("store-roomId", roomId);
//   });

//   socket.on("join-room", (roomId: string) => {
//     socket.join(roomId);
//   });

//   socket.on("receive-table", (roomId: string) => {
//     let table: Table = new Table();
//     let isStored: boolean = false;
//     table_find(roomId)
//       .then(data => {
//         table = Object.assign(JSON.parse(data!.get("table")), new Table());
//         isStored = true;
//       }).catch(() => {
//         console.log("table was not found");
//       });
//     // if table doesn't exist in a db, store a new table instance
//     if (!isStored) {
//       // fetch 25 words and add them to table

//       table_insert(roomId, JSON.stringify(table));
//     }
//     // send a table to frontend
//     io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
//   })

//   socket.on("update-table", (roomId: string, table: string | null) => {
//     if (table) table_update(roomId, table);
//   })

//   socket.on("receive-player", () => {
//     let player: Operative = new Operative("", "", "");
//     let isStored: boolean = false;
//     const playerId: string = socket.data.playerId;
//     player_find(playerId)
//       .then(data => {
//         player = Object.assign(JSON.parse(data!.get("player")), new Operative("", "", ""));
//         isStored = true;
//       })
//       .catch(() => {
//         console.log("could not find a player");
//       });
//     if (isStored) socket.emit("receive-player", JSON.stringify(player));
//     else socket.emit("receive-player", null);
//   })

//   socket.on("store-player", (playerName: string, roomId: string) => {
//     const playerId: string = socket.data.playerId;
//     let table: Table = new Table();
//     let player: Operative = new Operative(playerName, playerId, "no team");
//     table_find(roomId)
//       .then(data => {
//         table = Object.assign(JSON.parse(data!.get("table")), new Table());

//       }).catch(() => {
//         console.log("table was not found");
//       });
//     table.addPlayer(player);
//     table.addPlayerToTeam(player);
//     // table update
//     table_update(roomId, JSON.stringify(table));
//     //store player
//     player_insert(playerId, roomId, JSON.stringify(player));

//     io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
//     socket.emit("receive-player", JSON.stringify(player));
//   });

//   socket.on("update-player", (player: string | null) => {
//     if (player) player_update(player, socket.data.playerId);
//   });

//   socket.on('disconnect', () => {
//     socket.emit("delete-player");

//     console.log('player disconnected');
//   });
// });

server.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
