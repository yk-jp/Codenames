/*divide 25 cards list to 5 times one group per 5 cards.
  [["a","b","c","d","e"],["f","g","h","i","j"]]
*/
import IWord from '../interfaces/IWord';

const sliceWordList = (wordsList: IWord["words"]): IWord["words"][] => {
  let convertedList: IWord["words"][] = [];
  let tempList: IWord["words"] = [];
  wordsList.map((words, index) => {
    tempList.push(words);
    if ((index + 1) % 5 === 0) {
      convertedList.push(tempList);
      tempList = [];
    }
  });
  
  return convertedList;
}

export default sliceWordList;