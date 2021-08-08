// queries
import { languages_insert, languages_deleteAll } from "../controllers/queries/LanguageQuery";
import { words_insert } from "../controllers/queries/wordsQuery";
// attributes
import { WordsAttributes } from "../interfaces/schema/Words";
// config 
import cardLanguage from "./cardLanguage";
// fs module
import * as fs from "fs";

const jpPath = __dirname + "/../assets/japaneseWord.txt";
const enPath = __dirname + "/../assets/englishWord.txt";

const pathList: string[] = [jpPath, enPath];

const createWordList = (): WordsAttributes[] => {
  let wordList: WordsAttributes[] = [];

  pathList.map((path, index) => {
    const language: string = cardLanguage[index]["language"];

    const wordStringList: string[] = readTextFile(path).split("\r\n");

    wordStringList.map((wordString) => {
      const word: WordsAttributes = {
        word: wordString,
        language: language
      };
      wordList.push(word);
    });
  });

  return wordList;
};

const readTextFile = (path: string): string => {
  const word: string = fs.readFileSync(path, 'utf8');
  return word;
};

const initializeWordList = async () => {
  try {
    // clear all languages and words
    await languages_deleteAll();
    // insert language
    await languages_insert(cardLanguage);
    // create wordList to insert in db
    const wordList: WordsAttributes[] = createWordList();
    // insert 
    await words_insert(wordList);
  } catch (err) {
    console.log(err.message);
  }
}

export default initializeWordList;
