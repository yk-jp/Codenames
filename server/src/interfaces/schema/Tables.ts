import { Model } from "sequelize";
import Table from '../../models/Table';

interface TablesAttributes {
  id: string, //roomId
  table: Table; //JSON    JSON type doesn't work
}

export default interface TablesInstance extends Model<TablesAttributes>,
  TablesAttributes { }
