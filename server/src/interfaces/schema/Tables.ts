import { Model } from "sequelize";
import Table from '../../models/Table';

interface TablesAttributes {
  roomId: string, //roomId
  table: string; //convert it into string for a database
}

export default interface TablesInstance extends Model<TablesAttributes>,
  TablesAttributes { }
