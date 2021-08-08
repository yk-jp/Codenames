import { Model } from "sequelize";

export interface LanguagesAttributes {
  language: string;
}

export default interface LanguagesInstance extends Model<LanguagesAttributes>,
  LanguagesAttributes { }
