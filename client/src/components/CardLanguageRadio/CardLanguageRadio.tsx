import cardLanguage from '../../config/cardLanguage';
// controller
import CardLanguageController from './CardLanguageRadioController';
const CardLanguageRadio = (): JSX.Element => {
  const { cardLn, cardLanguageController, isCardLanguageDisabled } = CardLanguageController();

  return (
    <div id="language" className="mx-5 d-flex">
      {cardLanguage.map((language, index) => {
        return (
          <div key={index} className="d-flex">
            <input id={language} type="radio" ref={cardLn} name="language" className="my-2" onChange={(e) => cardLanguageController(e)} disabled={isCardLanguageDisabled} />
            <label className="form-check-label mx-2" htmlFor={language}>{language}</label>
          </div>
        );
      })}
    </div>
  );
}

export default CardLanguageRadio;