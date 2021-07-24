import { Model } from "sequelize";

// These are all the attributes in the En_words model
interface WordsAttributes {
  word: string;
  language: string;
}

export default interface WordsInstance extends Model<WordsAttributes>,
  WordsAttributes { }
