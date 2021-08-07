import { Dispatch } from 'react';
import Storage from "../../config/storage";

const LogTextController = (setLogText: Dispatch<string>): void => {
  const { log } = Storage();
  if (log) setLogText(log);
};

export default LogTextController;