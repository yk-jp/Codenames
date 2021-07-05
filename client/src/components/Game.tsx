import { FC, useState, useEffect } from 'react';
//components
import NameForm from './NameForm';
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
let game = io(config.server.game);

const Game: FC = (): JSX.Element => {
  const [url, setUrl] = useState<string>(window.location.search);
  const [roomId, setRoomId] = useState<string>(queryString.parse(window.location.search).room as string);
  const [wordSet, setWordSet] = useState<IWord["words"][]>([]);
  const [table, setTable] = useState<any>(null);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [player, setPlayer] = useState<IPlayer["player"] | null>(null);
  const [isplayerStored, setIsPlayerStored] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // store a roomId
    game.emit("store-roomId", roomId);
    // join in a room
    game.emit("join-room", roomId);
  }, []);

  useEffect(() => {
    //table
    game.emit("receive-table", roomId);
    // player
    game.emit("receive-player");
  },[]);

  useEffect(() => {
    game.on("receive-player", (player: string | null) => {
      if (player) {
        console.log(player);
        setIsPlayerStored(true);
        setPlayer(JSON.parse(player));
      }
    });
    game.on("receive-table", (table: string) => {
      setTable(JSON.parse(table));
      setIsLoading(false);
    });
  });



  // useEffect(() => {
  //   // game.emit("update-table", id, table);
  // }, [table]);

  // useEffect(() => {
  //   game.emit("recieve-player");
  // }, [player]);


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
  if (isLoading) return <Loading />
  if (!isplayerStored) return (
    <div>
      {`${JSON.stringify(player)}  afe   ${JSON.stringify(table)}`};
      <NameForm setPlayerName={setPlayerName} game={game} roomId={roomId} />
    </div>
  )
  return (
    <div>
      {table && JSON.stringify(table)}
      {JSON.stringify(player)}
    </div >
    // <div>pass</div>
  );
};

export default Game;