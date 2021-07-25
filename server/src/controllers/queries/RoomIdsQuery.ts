import RoomIds from "../../models/schema/RoomIds";

export const roomId_find = (roomId: string) => {
  return RoomIds.findOne({ where: { roomId: roomId } });
}

// when the room is created
export const roomId_insert = (roomId: string) => {
  return RoomIds.create({ roomId: roomId });
}

// when the last player leaves the room.
export const roomId_delete = (roomId: string) => {
  return RoomIds.destroy({ where: { roomId: roomId } });
}