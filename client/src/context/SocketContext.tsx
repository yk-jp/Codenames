import { createContext } from 'react';
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | any>(null);

export const SocketProvider = ({ children }): JSX.Element => {
  let socket: Socket | null = null; //If socket is defined(set up) here, data transaction doesn't work well. Clean up function in game.tsx is fired even in home page.

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}