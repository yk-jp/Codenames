import RoomIds from "../../models/schema/RoomIds";


export const roomId_find = async (roomId: string) => {
  return await RoomIds.findOne({ where: { roomId: roomId } });
}

// when the room is created
export const roomId_insert = async (roomId: string) => {
  await RoomIds.create({ roomId: roomId })
    .then(() => {
      console.log("stored new roomId");
    })
    .catch(() => {
      console.log("could not store a new roomId");
    });
}

// when the last player leaves the room.
export const roomId_delete = async (roomId: string) => {
  await RoomIds.destroy({
    where: {
      roomId: roomId
    }
  }).then(() => {
    console.log(`deleted roomId = `, roomId);
  })
    .catch(() => {
      console.log("could not delete the roomId");
    });
}