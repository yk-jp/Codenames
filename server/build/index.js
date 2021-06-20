"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db"));
const config_1 = __importDefault(require("./config/config"));
const app = express_1.default();
const port = config_1.default.server.port || "3001";
const host = config_1.default.server.host || "localhost";
//socket.io
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: "http://localhost:3000" } });
//test db connection
db_1.default.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));
const words_1 = __importDefault(require("./controllers/words"));
words_1.default();
app.use(express_1.default.static(__dirname + '/public'));
io.on('connection', (socket) => {
    console.log("connected", socket.id);
    socket.on("send-message", (msg, room) => {
        if (room === "")
            socket.broadcast.emit("display-message", msg);
        else
            socket.to(room).emit("display-message", msg);
    });
    socket.on("join-room", (room) => {
        socket.join(room);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(port, () => {
    console.log(`Server listening at http://${host}:${port}`);
});
