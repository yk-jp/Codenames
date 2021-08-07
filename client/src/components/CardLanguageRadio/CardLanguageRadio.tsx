import { useContext, useEffect, useState, useRef } from 'react';
import cardLanguage from '../../config/cardLanguage';
// context
import { GameDataContext } from '../../context/GameDataContext';
// controller
import { cardLanguageController, cardLanguageStyleContoller, cardLanguageInitialize } from './cardLanguageController';

const CardLanguageRadio = (): JSX.Element => {
  const { tableData, playerData } = useContext(GameDataContext);
  const [isCardLanguageDisabled, setIsCardLanguageDisabled] = useState<boolean>(false);
  // useRef
  const cardLn = useRef<HTMLInputElement>(null);
  useEffect(() => {
    cardLanguageInitialize();
    cardLanguageStyleContoller(tableData.table, setIsCardLanguageDisabled);
  }, [tableData.table, playerData.player]);

  return (
    <div id="language" className="mx-5 d-flex">
      {cardLanguage.map((language, index) => {
        return (
          <div key={index} className="d-flex">
            <input id={language} type="radio" ref={cardLn} name="language" className="my-2" onChange={(e) => cardLanguageController(e)} disabled={isCardLanguageDisabled}/>
            <label className="form-check-label mx-2" htmlFor={language}>{language}</label>
          </div>
        );
      })}
    </div>
  );
}

export default CardLanguageRadio;