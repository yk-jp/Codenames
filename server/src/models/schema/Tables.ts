import db from '../../config/db';
import TablesInstance from '../../interfaces/schema/Tables';
import { Sequelize, DataTypes } from "sequelize";

//id:roomId
const Tables = db.define<TablesInstance>('Tables', {
  roomId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  table: {
    type: DataTypes.TEXT,
    validate: {
      notEmpty: true
    }
  },
},
  {
    tableName: 'tables',
    timestamps: false // avoid adding createdAt,updatedAt columns automatically
  });

export default Tables;