import db from '../../config/db';
import TablesInstance from '../../interfaces/schema/Tables';
import { Sequelize, DataTypes } from "sequelize";

//id:roomId
const Tables = db.define<TablesInstance>('Tables', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  table: {
    type: DataTypes.JSON,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
},
  {
    tableName: 'tables',
    timestamps: false // avoid adding createdAt,updatedAt columns automatically
  });

export default Tables;