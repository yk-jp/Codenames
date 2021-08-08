import { Socket } from 'socket.io';
// query
import { roomId_find, roomId_insert } from '../queries/RoomIdsQuery';
// model
import RoomIdsInstance from '../../interfaces/schema/RoomIds';

const socketRoomIdController = (io: any, socket: Socket): void => {
  socket.once("store-roomId", async (roomId: string) => {
    try {
      const record: RoomIdsInstance | null = await roomId_find(roomId);
      // if roomId doensn't exist in the db, store a new roomId
      if (!record) await roomId_insert(roomId);
    } catch (err) {
      console.log(err);
    }
  });
}

export default socketRoomIdController;