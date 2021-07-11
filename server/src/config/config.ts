import dotenv from 'dotenv';
dotenv.config();

//server
const server_port: number = parseInt(process.env.SERVER_PORT!) || 3001;
const server_host: string = process.env.SERVER_HOST || "localhost";

const SERVER = {
  port: server_port,
  host: server_host
}

//database
const db_user: string = process.env.DB_USER as string;
const db_name: string = process.env.DB_NAME as string;
const db_password: string = process.env.DB_PASSWORD as string;
const db_host: string = process.env.DB_HOST as string;

const DB = {
  user: db_user,
  name: db_name,
  password: db_password,
  host: db_host
}

const config = {
  server: SERVER,
  db: DB,
}

export default config;