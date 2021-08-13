import dotenv from 'dotenv';
dotenv.config();

// socket.io
const server_form: string = process.env.REACT_APP_SERVER_FORM || "http://localhost:3001/form";
const server_game: string = process.env.REACT_APP_SERVER_GAME || "http://localhost:3001/game";

const SERVER = {
  form: server_form,
  game: server_game
}

const config = {
  server: SERVER
}

export default config;