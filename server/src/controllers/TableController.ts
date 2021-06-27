import Tables from "../models/schema/Tables";

export const table_find = async (id: string) => {
  await Tables.findOne({ where: { id: id } })
    .then(data => {
      console.log(data);
      console.log("table found. roomId = ", data!.id);
    })
    .catch(err => {
      console.log("table not found", err.message)
    });
}

// when the room is created
export const table_insert = async (id: string, table: string) => {
  await Tables.create({ id: id, table: table })
    .then(() => {
      console.log(`registered new table, roomId = `, id);
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

