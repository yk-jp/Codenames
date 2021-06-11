/*divide 25 cards list to 5 times one group per 5 cards.
  [["a","b","c","d","e"],["f","g","h","i","j"]]
*/

const sliceWordList = (wordList: string[]): string[][] => {
  let convertedList: string[][] = [];
  let temp: string[] = [];
  for (let i: number = 0; i < wordList.length; i++) {
    temp.push(wordList[i]);
    if ((i + 1) % 5 == 0) {
      convertedList.push(temp);
      temp = [];
    }
  };
  return convertedList;
}

export default sliceWordList;