import Table from "../../models/Table";
import { table_find, table_insert, table_update, table_delete } from '../queries/TablesQuery'

const socketTableController = (io: any, socket: any) => {
  //  table controller 
  socket.on("receive-table", (roomId: string) => {
    let table: Table = new Table();
    let isStored: boolean = false;
    table_find(roomId)
      .then(data => {
        table = Object.assign(JSON.parse(data!.get("table")), new Table());
        isStored = true;
      }).catch(() => {
        console.log("table was not found");
      });
    // if table doesn't exist in a db, store a new table instance
    if (!isStored) table_insert(roomId, JSON.stringify(table));
    // send a table to frontend
    io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
  })

};

export default socketTableController;
