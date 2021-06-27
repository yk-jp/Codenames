import Tables from "../../models/schema/Tables";
import Table from '../../models/Table';

export const table_find = async (id: string) => {
  return await Tables.findOne({ where: { id: id } })
  .then(data => {
    console.log("table found. roomId = ", data);
  })
  .catch(err => {
    console.log("table not found    ", err.message);
  });
}

// when the room is created
export const table_insert = async (id: string, table: Table) => {
  await Tables.create({ id: id, table: table })
    .then(() => {
      console.log("registered new table");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// when the last player leaves the room.
export const table_delete = async (id: string) => {
  await Tables.destroy({
    where: {
      id: id
    }
  }).then(() => {
    console.log(`deleted table, roomId = `, id);
  })
    .catch((err) => {
      console.log(err.message);
    });
}

