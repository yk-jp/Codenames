// model
import Table from "../../models/Table";
import TablesInstance from "../../interfaces/schema/Tables";
import ConvertJson from "../../models/utils/convertJson";
// query
import { table_find } from '../queries/TablesQuery'

const socketTableController = (io: any, socket: any) => {
  //  table controller 
  socket.on("receive-table", async (roomId: string) => {
    try {
      const tableData: TablesInstance | null = await table_find(roomId);

      if(!tableData) throw new Error("table was not found");

      const table:Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));
      io.of("/game").in(roomId).emit("receive-table", JSON.stringify(table));
    } catch (err) {
      console.log(err);
    }
  })
};

export default socketTableController;
