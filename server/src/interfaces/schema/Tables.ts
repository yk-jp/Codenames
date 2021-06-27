import { Model } from "sequelize";

interface TablesAttributes {
  id: string, //roomId
  table: string; //class object
}

export default interface TablesInstance extends Model<TablesAttributes>,
  TablesAttributes { }
