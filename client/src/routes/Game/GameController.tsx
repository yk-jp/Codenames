import { useState, useEffect, useContext } from 'react';
import { Socket } from "socket.io-client";
//context
import { LocationContext } from '../../context/LocationHistoryContext';
import { SocketContext } from '../../context/SocketContext';
import { GameDataContext } from '../../context/GameDataContext';
//config
import Storage from '../../config/storage';

const GameController = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { roomId, playerName, playerId, isAlreadyInitialized } = Storage();
  // context
  const locationHistory = useContext(LocationContext);
  const socket: Socket = useContext(SocketContext);

  const { tableData, playerData } = useContext(GameDataContext);

  const disconnectionHandler = (playerId: string) => {
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
      socket.emit("join-room", roomId, playerId, playerName);
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
        // log
        sessionStorage.setItem("log", 'WELCOME! \r\n******************\r\n');
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

      socket.on("delete-session", () => {
        sessionStorage.clear();
      });

      socket.on("disconnect", () => {
        // when disconnecting
        disconnectionHandler(playerId);
      });
    }

    return () => {
      // when going to another page.
      disconnectionHandler(playerId);
    }
  }, []);

  return { isLoading, isLoggedIn };

};

export default GameController;