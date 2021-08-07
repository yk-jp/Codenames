import { useState, useEffect, useContext } from 'react';
import Storage from "../../config/storage";
// context
import { GameDataContext } from '../../context/GameDataContext';
import { SocketContext } from '../../context/SocketContext';

const LogController = () => {
  const { tableData } = useContext(GameDataContext);
  const socket = useContext(SocketContext);

  const [logText, setLogText] = useState<string>("WELCOME! \r\n******************\r\n");;

  const LogTextController = (): void => {
    const { log } = Storage();
    if (log) setLogText(log);
  };

  useEffect(() => {
    LogTextController();
  }, [tableData.table]);

  useEffect(() => {
    socket.on("receive-message", (message: string) => {
      let { log } = Storage();
      log += `${message} \r\n******************\r\n`;
      sessionStorage.setItem("log", log);
      setLogText(log);
    });
    return (() => {
      socket.off("receive-message");
    });
  }, [socket]);

  return { logText };
};

export default LogController;