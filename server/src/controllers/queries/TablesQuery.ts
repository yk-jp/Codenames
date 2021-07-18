import { table } from "console";
import Tables from "../../models/schema/Tables";

export const table_find = (roomId: string) => {
  return Tables.findOne({ where: { roomId: roomId } })
}

// when the room is created
export const table_insert = async (roomId: string, table: string) => {
  await Tables.create({ roomId: roomId, table: table })
    .then(() => {
      console.log("stored new table");
    })
    .catch(() => {
      console.log("could not store a new table");
    });
}

// when the last player leaves the room.
export const table_delete = async (roomId: string) => {
  await Tables.destroy({
    where: {
      roomId: roomId
    }
  }).then(() => {
    console.log(`deleted table, roomId = `, roomId);
  })
    .catch(() => {
      console.log("could not delete a table");
    });
}

export const table_update = async (roomId: string, table: string) => {
  await Tables.update({ table: table }, {
    where: { roomId: roomId }
  }).then(() => {
    console.log("updated table,  roomId = ", roomId);
  })
    .catch(() => {
      console.log("could not update a table");
    });
}

