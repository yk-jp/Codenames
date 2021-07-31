//get 25 words randomly from the database.
import Words from '../../models/schema/Words';
import { Sequelize } from "sequelize";
import WordsInstance from '../../interfaces/schema/Words';

export const words_findAll = async (language: string) => {
  return await Words.findAll({ order: Sequelize.literal('rand()'), limit: 25, raw: true, where: { language: language } });
}

export const word_insert = (word: string, language: string) => {
  return Words.create({ word: word, language: language });
}

export const words_insert = async (words: WordsInstance[]) => {
  return await Words.bulkCreate(words);
}