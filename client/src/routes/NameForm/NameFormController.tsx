import { useState, useRef, useContext } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
// config
import config from '../../config/config';
// hook 
import { postDataForForm } from '../../hooks/postDataForForm';
// context
import { LocationContext } from '../../context/LocationHistoryContext';

const NameFormController = () => {
  const name = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const locationHistory = useContext(LocationContext);

  const goToGamePage = (roomId: string): void => {
    locationHistory!.push(`/game/${roomId}`, { loggedIn: true });
  };

  const joinRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let roomId: string = uuidv4();
    if (locationHistory.location.state) {
      // a player who directly came from a game page. →　back to the previous page
      roomId = locationHistory.location.state.prev.substring(locationHistory.location.state.prev.lastIndexOf("/") + 1);
    }

    if (name.current!.value.length > 10) name.current!.value = name.current!.value.substring(0, 10);

    await postDataForForm(JSON.stringify(name.current!.value), roomId, config.server.form)
      .then((res: AxiosResponse) => {
        // save name to the session storage
        sessionStorage.setItem("playerName", name.current!.value);
        sessionStorage.setItem("playerId", uuidv4());
        // store name to the sessionStorage 
        goToGamePage(roomId);
      }).catch((err: AxiosError) => {
        if (err.response) {
          // If 10 players are already in the room
          setErrorMsg(err.response.data);
          return;
        }
        setErrorMsg(err.message);
      });
  };

  return { name, joinRoom, errorMsg };
};


export default NameFormController;