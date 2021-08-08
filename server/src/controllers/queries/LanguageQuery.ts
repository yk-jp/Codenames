import Languages from "../../models/schema/Languages";
import { LanguagesAttributes } from "../../interfaces/schema/Languages";

export const languages_insert = async (languages: LanguagesAttributes[]) => {
  return await Languages.bulkCreate(languages);
};

export const languages_deleteAll = async () => {
  return Languages.destroy({ where: {} });
};