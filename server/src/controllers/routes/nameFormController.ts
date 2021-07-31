import { Request, Response, NextFunction } from "express";
// interface
import TablesInstance from "../../interfaces/schema/Tables";
import Table from "../../models/Table";
// query
import { table_find } from "../queries/TablesQuery";
// model
import ConvertJson from "../../models/utils/convertJson";

const startSession = async (req: Request, res: Response, next: NextFunction) => {
  const roomId: string = req.body.roomId;
  const tableData: TablesInstance | null = await table_find(roomId);
  if (tableData) {
    const table: Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));
    /*10 players can join in one room */
    if (table.getPlayers().length >= 10) res.status(400).send("Sorry, you can't join now :_(");
    else if(table.getGameStatus() !== "START") res.status(400).send("Sorry, wait for a while until current game ends :_(");
  }

  // end
  res.end();
};

export default startSession;