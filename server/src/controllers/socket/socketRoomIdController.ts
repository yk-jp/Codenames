import { roomId_find, roomId_insert, roomId_delete } from '../queries/RoomIdsQuery';
import RoomIdsInstance from '../../interfaces/schema/RoomIds';

const socketRoomIdController = (io: any, socket: any): void => {
  socket.once("store-roomId", async (roomId: string) => {
    const record: RoomIdsInstance | null = await roomId_find(roomId);
    // if roomId doensn't exist in the db, store a new roomId
    if (!record) await roomId_insert(roomId);
  });
}

export default socketRoomIdController;