import db from '../../config/db';
import LanguagesInstance from '../../interfaces/schema/Languages';
import { DataTypes } from "sequelize";
import Words from './Words';
const Languages = db.define<LanguagesInstance>('Languages', {
  language: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
},
  {
    tableName: 'languages',
    timestamps: false
  });

/*
  foreignKey = foreignKey of tables model 
  targetKey = the key in the column of RoomIds model that link to foreignKey
*/

Words.belongsTo(Languages, { foreignKey: "language", targetKey: "language", onDelete: 'cascade', onUpdate: 'cascade' });
Languages.hasMany(Words);

export default Languages;