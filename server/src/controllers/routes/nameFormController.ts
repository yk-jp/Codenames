import { Request, Response } from "express";
// message
import Message from "../../config/message";
// interface
import TablesInstance from "../../interfaces/schema/Tables";
import Table from "../../models/Table";
// query
import { table_find } from "../queries/TablesQuery";
// model
import ConvertJson from "../../models/convertJson";

const startSession = async (req: Request, res: Response) => {
  const roomId: string = req.body.roomId;
  const tableData: TablesInstance | null = await table_find(roomId);
  if (tableData) {
    const table: Table = ConvertJson.toTable(JSON.parse(tableData.get("table")));
    /*10 players can join in one room */
    if (table.isMaximumNumberOfPlayers()) res.status(400).send(Message.Error.maximumNumberOfPlayers);
    else if(table.getGameStatus() !== "START") res.status(400).send(Message.Error.isPlaying);
  }

  // end
  res.end();
};

export default startSession;