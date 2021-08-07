import { useState, useEffect, useContext } from 'react';
// config
import Storage from "../../config/storage";
// context
import { SocketContext } from '../../context/SocketContext';
import { GameDataContext } from '../../context/GameDataContext';
// css
import LogStyle from './Log.module.css';
// controller
import LogTextController from './LogTextController';

const Log = (): JSX.Element => {
  const [logText, setLogText] = useState<string>("WELCOME! \r\n******************\r\n");;
  // context
  const socket = useContext(SocketContext);
  const { tableData } = useContext(GameDataContext);

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
  }, []);

  useEffect(() => {
    LogTextController(setLogText);
  }, [tableData.table]);

  return (
    <div id="log" className="form-group px-4 px-md-0 offset-md-0 col-12 col-md-12">
      <textarea className={`form-control ${LogStyle["resize-none"]} bg-white p-0 ${LogStyle.log} mt-md-5 text-success`} id="comment" value={logText} readOnly>
      </textarea>
    </div>
  );

};

export default Log;