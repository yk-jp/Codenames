import RoomIds from "../../models/schema/RoomIds";


export const roomId_find = async (roomId: string) => {
  return await RoomIds.findOne({ where: { roomId: roomId } })
    .then(data => {
      console.log("roomId found. roomId = ", data);
    })
    .catch(err => {
      console.log("roomId not found    ", err.message);
    });
}

// when the room is created
export const roomId_insert = async (roomId: string) => {
  await RoomIds.create({ roomId: roomId })
    .then(() => {
      console.log("stored new roomId");
    })
    .catch((err) => {
      console.log(err.message);
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
    .catch((err) => {
      console.log(err.message);
    });
}