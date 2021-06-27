import { Model } from "sequelize";

// These are all the attributes in the En_words model
interface En_wordsAttributes {
  id: number;
  word: string;
}

export default interface En_wordsInstance extends Model<En_wordsAttributes>,
  En_wordsAttributes { }
