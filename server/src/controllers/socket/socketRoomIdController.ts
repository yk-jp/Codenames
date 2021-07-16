import { roomId_find, roomId_insert, roomId_delete } from '../queries/RoomIdsQuery';

const socketRoomIdController = (io: any, socket: any):void => {
  socket.once("store-roomId", (roomId: string) => {
    let isStored: boolean = false;
    roomId_find(roomId)
      .then(data => {
        isStored = true;
      }).catch((err) => {
        console.log("This roomId is already stored.")
      });
    // if roomId doensn't exist in the db, store a new roomId
    if (!isStored) roomId_insert(roomId);
  });
}

export default socketRoomIdController;