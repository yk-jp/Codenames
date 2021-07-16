import dotenv from 'dotenv';
dotenv.config();

//URI for fetching 25 words data from an endpoint.
const WORD_URI: string = "http://localhost:8000/words";


// scket.io
const server_home: string = "http://localhost:3001";
const server_form: string = "http://localhost:3001/form";
const server_game: string = "http://localhost:3001/game";

// transition
const page_home: string = "http://localhost:3000";
const page_form: string = "http://localhost:3000/form";
const page_game: string = "http://localhost:3000/game";

const SERVER = {
  home: server_home,
  form: server_form,
  game: server_game
}

const PAGE = {
  home: page_home,
  form: page_form,
  game: page_game
}

const config = {
  server: SERVER,
  page: PAGE,
  word_URI: WORD_URI
}

export default config;