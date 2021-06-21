import dotenv from 'dotenv';
dotenv.config();

//URI for fetching 25 words data from an endpoint.
const WORD_URI: string = "http://localhost:8000/words";


// endpoint
const server_endpoint: string = "http://localhost:3001";

const config = {
  endpoint: server_endpoint,
  word_URI: WORD_URI
}

export default config;