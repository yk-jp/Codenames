import { table_find, table_insert, table_update, table_delete } from "../controllers/queries/TablesQuery";
import Table from "../models/Table";
import ConvertJson from "../models/utils/convertJson";
const roomId = "ce0fb9e7-cc7a-4ab4-9c97-40767a191579";
let result = null;
let table: Table = new Table();
table_find(roomId)
  .then(data => {
    // table = ConvertJson.toTable(JSON.parse(data!.get("table")));
    console.log(table);
    result = data;
  }).catch(err => {
    console.log(err)
  })

console.log(result);