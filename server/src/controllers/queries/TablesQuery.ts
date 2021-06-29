import Tables from "../../models/schema/Tables";
import Table from '../../models/Table';

export const table_find = async (roomId: string) => {
  return await Tables.findOne({ where: { roomId: roomId } })
    .then(data => {
      console.log("table found. roomId = ", data);
    })
    .catch(err => {
      console.log("table not found    ", err.message);
    });
}

// when the room is created
export const table_insert = async (roomId: string, table: string) => {
  await Tables.create({ roomId: roomId, table: table })
    .then(() => {
      console.log("stored new table");
    })
    .catch((err) => {
      console.log(err.message);
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
    .catch((err) => {
      console.log(err.message);
    });
}

