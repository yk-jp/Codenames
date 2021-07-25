import db from '../../config/db';
import TablesInstance from '../../interfaces/schema/Tables';
import { DataTypes } from "sequelize";

//id:roomId
const Tables = db.define<TablesInstance>('Tables', {
  roomId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull:false,
    validate: {
      notEmpty: true
    }
  },
  table: {
    type: DataTypes.TEXT,
    allowNull:false,
    validate: {
      notEmpty: true
    }
  },
},
  {
    tableName: 'tables',
    timestamps: false
  });

export default Tables;