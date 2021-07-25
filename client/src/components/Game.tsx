import { FC, useState, useEffect, useContext } from 'react';
import GameTable from './GameTable';
import Loading from './Loading';
//context
import { LocationContext } from '../context/LocationHistoryContext';
import { SocketContext } from '../context/SocketContext';
import { GameDataContext } from '../context/GameDataContext';
import { io, Socket } from "socket.io-client";
import config from '../config/config';
const Game: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const roomId: string = window.location.pathname.split("/").pop() as string;
  // context
  const locationHistory = useContext(LocationContext);
  let socket: Socket = useContext(SocketContext);
  socket = io(config.server.game, {
    autoConnect: false,
    withCredentials: true
  });
  const { tableData, playerData } = useContext(GameDataContext);
  // data from localstorage
  const playerName: string = sessionStorage.getItem("playerName") as string;
  const playerId: string = sessionStorage.getItem("playerId") as string;
  const isAlreadyInitialized: string | null = sessionStorage.getItem("isAlreadyInitialized") as string;

  const disconnectionHandler = () => {
    socket.emit("leave-room", roomId, playerId);
    socket.off();
    socket.close();
    sessionStorage.clear();
  };

  useEffect(() => {
    if (locationHistory!.location.state === undefined || !locationHistory!.location.state.loggedIn) {
      locationHistory!.push('/form', { loggedIn: false, from: "gamePage", prev: locationHistory!.location.pathname });
    } else if (!playerId || !playerName) {
      //When player hit the back button on browser and tried to go back to the game page, lead them to not found page.
      locationHistory!.push('/NotFound');
    } else {
      setIsLoggedIn(true);

      // If log in was successfully done, connect to the backend with socket  
      socket.connect();
      // roomId
      socket.emit("store-roomId", roomId);
      // join room
      socket.emit("join-room", roomId);
      if (!isAlreadyInitialized) {
        // initialize
        socket.emit("initialize-table-and-player", roomId, playerName, playerId);
      } else {
        // after initializing, receive a table data and a player data.
        socket.emit("receive-table", roomId);
        socket.emit("receive-player", playerId);
      }
      socket.on("initialize-table-and-player", (isAlreadyInitialized: string) => {
        sessionStorage.setItem("isAlreadyInitialized", isAlreadyInitialized);
      });

      // table
      socket.on("receive-table", (table: string) => {
        tableData.setTable(JSON.parse(table));
        // after receiving a table data
        setIsLoading(false);
      });
      //player
      socket.on("receive-player", (player: string) => {
        playerData.setPlayer(JSON.parse(player));
      });

      socket.on("disconnect", () => {
        // when disconnecting
        disconnectionHandler();
      });
    }

    return () => {
      disconnectionHandler();
    }
  }, []);

  return (
    <>
      {(isLoading || !isLoggedIn) && <Loading />}
      {tableData.table && <GameTable />}
    </>
  );
};

export default Game;