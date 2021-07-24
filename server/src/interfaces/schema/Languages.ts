import { Model } from "sequelize";

interface LanguagesAttributes {
  language: string;
}

export default interface LanguagesInstance extends Model<LanguagesAttributes>,
  LanguagesAttributes { }
