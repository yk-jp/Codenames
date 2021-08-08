import { Socket } from 'socket.io';

const socketDisconnectionController = (io: any, socket: Socket) => {
  socket.on("disconnect",  async () => {
  console.log('player disconnected');
  });
}

export default socketDisconnectionController;