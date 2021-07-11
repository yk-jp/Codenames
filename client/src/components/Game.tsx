import { FC, useState, useEffect } from 'react';
//components
import GameTable from './GameTable';
import Loading from './Loading';
// interfaces
import IWord from '../interfaces/IWord';
import IPlayer from '../interfaces/IPlayer';
//socket.io
import { io } from "socket.io-client";
// custom hook
import sliceWordList from '../hooks/sliceWordList';
// config
import config from '../config/config';
// others 
import queryString from 'query-string';
import { Socket } from 'net';

//socket.io
// let socket = io(config.server.home, {
//   autoConnect: true,
//   withCredentials: true,
// });

// let game = io(config.server.game, {
//   autoConnect: true,
//   withCredentials: true,
// });

const Game: FC = (): JSX.Element => {
  const [url, setUrl] = useState<string>(window.location.search);
  const [roomId, setRoomId] = useState<string>(queryString.parse(window.location.search).room as string);
  const [wordSet, setWordSet] = useState<IWord["words"][]>([]);
  const [table, setTable] = useState<any>(null);
  const [player, setPlayer] = useState<IPlayer["player"] | null>(null);
  const [isplayerStored, setIsPlayerStored] = useState<boolean>(false);

  const [playerNameAlreadySelected, setPlayerNameAlreadySelected] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // game.on("session", ({ sessionID, playerID }) => {
    //   sessionStorage.setItem("sessionID", sessionID);
    //   game.connect();
    // });

    // const sessionID = localStorage.getItem("sessionID");
    // if (sessionID) {
    //   setPlayerNameAlreadySelected(true);
    //   game.connect();
    // }

    // // //table
    // game.emit("receive-table", roomId);
    // game.on("receive-table", (table: string) => {
    //   setTable(JSON.parse(table));
    //   setIsLoading(false);
    // });
    // // player
    // game.emit("receive-player");
    // game.on("receive-player", (player: string | null) => {
    //   if (player) {
    //     setPlayer(JSON.parse(player));
    //     console.log(player);
    //   }
    // });
  }, []);

  // fetch words
  // const wordList = async () => {
  //   await fetch(config.word_URI)
  //     .then(res => {
  //       if (!res.ok) throw Error("Could not fetch data");
  //       return res.json();
  //     }
  //     )
  //     .then(data => {
  //       storeWordData(data);
  //     })
  //     .catch(err => console.log(err.message))
  // }

  // const storeWordData = async (data: IWord["words"]) => {
  //   const convertedData: IWord["words"][] = await sliceWordList(data);
  //   setWordSet(convertedData);
  // };
  // if (isLoading) return <Loading />
  return (
    <GameTable />
  );
};

export default Game;