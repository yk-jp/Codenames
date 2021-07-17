import Table from "../../models/Table";
import { table_find, table_insert, table_update, table_delete } from '../queries/TablesQuery'
import ConvertJson from "../../models/utils/convertJson";

const socketTableController = (io: any, socket: any) => {
  //  table controller 
  socket.on("receive-table", (roomId: string) => {
    let table: Table = new Table();
    table_find(roomId)
      .then(data => {
        table = ConvertJson.toTable(JSON.parse(data!.get("table")));
        console.log(table);
        io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
      }).catch(() => {
        console.log("table was not found");
      });
  })
};

export default socketTableController;
