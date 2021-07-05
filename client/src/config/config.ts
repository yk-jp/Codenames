import dotenv from 'dotenv';
dotenv.config();

//URI for fetching 25 words data from an endpoint.
const WORD_URI: string = "http://localhost:8000/words";


// scket.io
const server_home: string = "http://localhost:3001";
const server_game: string = "http://localhost:3001/game";

// transition
const page_home: string = "http://localhost:3000";
const page_game: string = "http://localhost:3000/game";

const SERVER = {
  home: server_home,
  game: server_game
}

const PAGE = {
  home: page_home,
  game: page_game
}


const config = {
  server: SERVER,
  page: PAGE,
  word_URI: WORD_URI
}

export default config;