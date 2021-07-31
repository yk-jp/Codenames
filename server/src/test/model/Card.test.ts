import { words_findAll, word_insert } from "../../controllers/queries/wordsQuery";
import WordsInstance from "../../interfaces/schema/Words";
import Card from "../../models/Card";

const language: string[] = ["jp", "en"];
let wordsData: WordsInstance[] | null;
let words: string[];
let languages: string[];
const teams: string[] = ['RED', 'BLUE', 'BYSTANDER', 'ASSASIN'];

describe("words query", () => {

  beforeAll(async () => {
    wordsData = await words_findAll(language[0]);
    words = wordsData.map(wordData => wordData.word);
    languages = wordsData.map(wordData => wordData.language);
  });
  test('fetch 25 words', async () => {
    // words length must be 25 for cards
    expect(words.length).toBe(25);
  });

  test('all words are japanese words', () => {
    // all words are japanese
    expect(languages).toEqual(expect.arrayContaining([language[0]]));
  });
});

describe("card class", () => {
  beforeAll(async () => {
    wordsData = await words_findAll(language[0]);
    words = wordsData.map(wordData => wordData.word);
    languages = wordsData.map(wordData => wordData.language);
  });


  test('allocate team to each card and shuffle them', async () => {

    let cards: Card[] = Array(25).fill(new Card("NO TEAM", ""));

    expect(cards.length).toBe(25);

    cards = [];
    wordsData?.map((wordData, i) => {
      if (i == wordsData!.length - 2 || i == wordsData!.length - 3) cards.push(new Card(teams[teams.length - 2], wordData.word));
      else if (i == wordsData!.length - 1) cards.push(new Card(teams[teams.length - 1], wordData.word));
      else cards.push(new Card(teams[i % 3], wordData.word));
    });

    expect(cards.length).toBe(25);

    let hashMap: any = {};
    for (let i = 0; i < cards.length; i++) {
      if (hashMap[cards[i].getTeam()] == undefined) hashMap[cards[i].getTeam()] = 1;
      else hashMap[cards[i].getTeam()] = hashMap[cards[i].getTeam()] + 1;
    }
    expect(hashMap[teams[0]]).toBe(8); //red
    expect(hashMap[teams[1]]).toBe(7); //blue
    expect(hashMap[teams[2]]).toBe(9); //bystander
    expect(hashMap[teams[3]]).toBe(1); //assasin

    /*shuffle cards before setting them to table
      fisher algorithm
      Math.random() * (max - min) + min
    */

    for (let i = 0; i < cards.length; i++) {
      let rand = Math.floor(Math.random() * (cards.length - i));
      let temp = cards[i];
      cards[i] = cards[rand];
      cards[rand] = temp;
    }

    console.log(cards);
  });
});
