import { ChangeEvent, useContext, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { cardLanguage } from '../config/cardLanguage';
// context
import { SocketContext } from '../context/SocketContext';
import { GameDataContext } from '../context/GameDataContext';
const CardLanguageRadio = ({ roomId, cardLn }): JSX.Element => {
  const socket = useContext(SocketContext);
  const { tableData, playerData } = useContext(GameDataContext);

  const cardLanguageController = (e: ChangeEvent<HTMLInputElement>, socket: Socket, roomId: string) => {
    sessionStorage.setItem("language", e.target.id);
    socket.emit("change-card-language", e.target.id, roomId);
  };

  useEffect(() => {
    socket.on("change-card-language", (languageId: string) => {
      cardLn.current = document.getElementById(languageId);
      cardLn.current.checked = true;
    });

    return () => {
      socket.off("change-card-language");
    };
  }, [tableData.table, playerData.player]);

  return (
    <div id="language" className="mx-5 d-flex">
      {cardLanguage.map((language, index) => {
        return (
          <div key={index}>
            <input id={language} type="radio" ref={cardLn} name="language" onChange={(e) => cardLanguageController(e, socket, roomId)} />
            <label className="form-check-label mx-2" htmlFor={language}>{language}</label>
          </div>
        );
      })}
    </div>
  );
}

export default CardLanguageRadio;