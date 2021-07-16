//connection controller
const connect = (): void => {

};


const disconnect = (socket: any) => {
  console.log('player disconnected');
  // before closing session, need to delete a player data form db.
  
};

export const socketConnection = {
  connect: connect,
  disconnect: disconnect
}
