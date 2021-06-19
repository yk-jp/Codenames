"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//server
const server_port = parseInt(process.env.SERVER_PORT) || 3001;
const server_host = process.env.SERVER_HOST || "localhost";
const SERVER = {
    port: server_port,
    host: server_host
};
//database
const db_user = process.env.DB_USER;
const db_name = process.env.DB_NAME;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;
const DB = {
    user: db_user,
    name: db_name,
    password: db_password,
    host: db_host
};
const config = {
    server: SERVER,
    db: DB
};
exports.default = config;
