import { table_find, table_insert, table_update, table_delete } from "../controllers/queries/TablesQuery";
import Table from "../models/Table";
import ConvertJson from "../models/utils/convertJson";
import Spymaster from "../models/Spymaster";
import Tables from "../models/schema/Tables";
import ITable from "../interfaces/ITable";
import Operative from "../models/Operative";
const roomId = "ce0fb9e7-cc7a-4ab4-9c97-40767a191579";
let result = null;
let table: Table = new Table();
const test = async () => {
  const a = await find(roomId);
  let t = JSON.parse(a!.get("table"));

  let b = ConvertJson.toTable(t);
  console.log(b);

  b.addPlayer(new Operative("faef", "fff", "a", ""));

  table_update(roomId, JSON.stringify(b));

  const c = await table_find(roomId);
  let tc = JSON.parse(c!.get("table"));

  console.log("aaaaaaaaa", ConvertJson.toTable(tc));


  return a!.get("table")


};

const find = (roomId: any) => {
  return Tables.findOne({ where: { roomId: roomId } })
}

test();

// table_find(roomId)
//   .then(data => {
//     // table = ConvertJson.toTable(JSON.parse(data!.get("table")));
//     // console.log(table);
//     result = data;
//   }).catch(err => {
//     console.log(err)
//   })

// console.log("aaa",result);