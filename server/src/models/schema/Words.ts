import db from '../../config/db';
import En_wordsInstance from '../../interfaces/En_words';
import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from "sequelize";

const En_words = db.define<En_wordsInstance>('En_words', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false
  },
},
  {
    tableName: 'en_words',
    timestamps: false // avoid adding createdAt,updatedAt columns automatically
  });

export default En_words;