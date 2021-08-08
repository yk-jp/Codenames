import db from '../../config/db';
import WordsInstance from '../../interfaces/schema/Words';
import { DataTypes } from "sequelize";

const Words = db.define<WordsInstance>('Words', {
  word: {
    type: DataTypes.STRING,
    primaryKey:true,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
},
  {
    tableName: 'words',
    timestamps: false // avoid adding createdAt,updatedAt columns automatically
  });

export default Words;