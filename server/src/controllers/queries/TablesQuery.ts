import Tables from "../../models/schema/Tables";

export const table_find = (roomId: string) => {
  return Tables.findOne({ where: { roomId: roomId } })
}

// when the room is created
export const table_insert = (roomId: string, table: string) => {
  return Tables.create({ roomId: roomId, table: table });
}
// when the last player leaves the room.
export const table_delete = (roomId: string) => {
  return Tables.destroy({ where: { roomId: roomId } });
}

export const table_update = (roomId: string, table: string) => {
  return Tables.update({ table: table }, { where: { roomId: roomId } });
}

