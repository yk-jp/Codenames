import { FC, useState, useEffect, useContext, useRef } from 'react';
//components
import GameTable from './GameTable';
import Loading from './Loading';
// interfaces
import IWord from '../interfaces/IWord';
import IPlayer from '../interfaces/IPlayer';
//socket.io
import { io } from "socket.io-client";
import { socketConnection } from '../controllers/socket/socket-connection-controller';
import { socketPlayer } from '../controllers/socket/socket-player-controller';
import { socketTable } from '../controllers/socket/socket-table-controller';
// custom hook
import sliceWordList from '../hooks/sliceWordList';
// config
import config from '../config/config';
// others 
import queryString from 'query-string';
import { LocationContext } from '../context/LocationHistoryContext';

const Game: FC = (): JSX.Element => {
  const [url, setUrl] = useState<string>(window.location.search);
  const [wordSet, setWordSet] = useState<IWord["words"][]>([]);
  const [table, setTable] = useState<any>(null);
  const [player, setPlayer] = useState<IPlayer["player"] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const locationHistory = useContext(LocationContext);
  //socket.io
  const socket = useRef(io(config.server.game, {
    autoConnect: false,
    withCredentials: true,
  }));
  let roomId: string;
  let playerName: string;
  let playerId: string;

  useEffect(() => {
    if (locationHistory!.history.location.state == undefined || !locationHistory!.history.location.state.loggedIn) {
      locationHistory!.history.push('/form', { loggedIn: false, from: "gamePage", prev: locationHistory!.history.location.pathname });
    }
    setIsLoggedIn(true);
    roomId = window.location.pathname.split("/").pop() as string;
    playerName = sessionStorage.getItem("playerName") as string;
    playerId = sessionStorage.getItem("playerId") as string;

    // If log in was successfully done, connect to the backend with socket  
    socket.current.connect();
    // roomId
    socket.current.emit("store-roomId", roomId);
    // join room
    socket.current.emit("join-room", roomId);
    // table
    socket.current.on("receive-table", (table: string) => {
      setTable(JSON.parse(table));
    });
    setIsLoading(false);

    // player
    socket.current.emit("store-player", playerName, playerId, roomId);
    socket.current.on("receive-player", (player: string) => {
      setPlayer(JSON.parse(player));
      console.log(player);
    });

    return () => {
      socket.current.off();
    }
  }, []);

  useEffect(() => {
    // table 
    socket.current.emit("receive-table", roomId);
    // player
    socket.current.emit("receive-player", playerName, playerId, roomId);
    return () => {
      socket.current.off();
    }
  }, [table, player]);

  return (
    <>
      {(isLoading || !isLoggedIn) && <Loading />}
      {table && JSON.stringify(table)}
      fafeffffff
      {player && JSON.stringify(player)}
      {/* <GameTable /> */}
    </>
  );
};

export default Game;