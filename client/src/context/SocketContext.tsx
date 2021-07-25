import { createContext } from 'react';
import { io, Socket } from "socket.io-client";
import config from '../config/config';

export const SocketContext = createContext<Socket>(io(config.server.game, {
  autoConnect: false,
  withCredentials: true
}));

export const SocketProvider = ({ children }): JSX.Element => {
  const socket = io(config.server.game, {
    autoConnect: false,
    withCredentials: true
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}