import { ChangeEvent, useContext, useRef, useState, useEffect } from 'react';
// config
import Storage from '../../config/storage';
import cardLanguage from '../../config/cardLanguage';
// context
import { GameDataContext } from '../../context/GameDataContext';

const CardLanguageRadioController = () => {
  const { tableData, playerData } = useContext(GameDataContext);
  const [isCardLanguageDisabled, setIsCardLanguageDisabled] = useState<boolean>(false);
  // useRef
  const cardLn = useRef<HTMLInputElement>(null);

  const cardLanguageController = (e: ChangeEvent<HTMLInputElement>) => {
    sessionStorage.setItem("language", e.target.id);
  };

  const cardLanguageStyleContoller = () => {
    if (tableData.table.status !== "START") setIsCardLanguageDisabled(true);
    else setIsCardLanguageDisabled(false);
  };

  const cardLanguageInitialize = () => {
    const { language } = Storage();
    // language option
    if (language) document.getElementById(language)!["checked"] = true;
    else {
      sessionStorage.setItem("language", cardLanguage[cardLanguage.length - 1]);
      document.getElementById(cardLanguage[cardLanguage.length - 1])!["checked"] = true;
    }
  };

  useEffect(() => {
    cardLanguageInitialize();
    cardLanguageStyleContoller();
  }, [tableData.table, playerData.player]);

  return { cardLn, cardLanguageController, isCardLanguageDisabled };
};


export default CardLanguageRadioController;
