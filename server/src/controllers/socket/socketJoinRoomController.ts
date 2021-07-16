const socketJoinRoomController = (io: any, socket: any): void => {
  socket.once("join-room", (roomId: string) => {
    socket.join(roomId);
  });
}

export default socketJoinRoomController;