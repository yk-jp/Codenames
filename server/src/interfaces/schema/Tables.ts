import { Model } from "sequelize";

interface TablesAttributes {
  roomId: string, //roomId
  table: string; //convert it into string for a database
}

export default interface TablesInstance extends Model<TablesAttributes>,
  TablesAttributes { }
