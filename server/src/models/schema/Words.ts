import db from '../../config/db';
import En_wordsInstance from '../../interfaces/schema/En_words';
import { Sequelize, DataTypes } from "sequelize";

const En_words = db.define<En_wordsInstance>('En_words', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
},
  {
    tableName: 'en_words',
    timestamps: false // avoid adding createdAt,updatedAt columns automatically
  });

export default En_words;