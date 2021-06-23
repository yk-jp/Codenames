import dotenv from 'dotenv';
dotenv.config();

//URI for fetching 25 words data from an endpoint.
const WORD_URI: string = "http://localhost:8000/words";


// socket.io
const server_home: string = "http://localhost:3001";
const server_lobby: string = "http://localhost:3001/lobby";

const config = {
  home: server_home,
  lobby: server_lobby,
  word_URI: WORD_URI
}

export default config;