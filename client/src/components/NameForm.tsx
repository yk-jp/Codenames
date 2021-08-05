import { FC, useState, useRef, useContext } from 'react';
// hook 
import { postDataForForm } from '../hooks/postDataForForm';
// others
import { AxiosError, AxiosResponse } from 'axios';
import { LocationContext } from '../context/LocationHistoryContext';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/config';

const NameForm: FC = (): JSX.Element => {
  const name = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const locationHistory = useContext(LocationContext);

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

  const goToGamePage = (roomId: string): void => {
    locationHistory!.push(`/game/${roomId}`, { loggedIn: true });
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center mt-5">
        {/* name */}
        <div className="name d-flex flex-column">
          <form onSubmit={(e) => joinRoom(e)}>
            <div className="d-flex justify-content-center p-5">
              <input id="playerName" type="text" className="my-3 text-center" name="name" placeholder="ENTER YOUR NAME" ref={name} required />
            </div>
            {/* Join room */}
            <div className="d-flex justify-content-center">
              <button id="nameBtn" type="submit" className="btn btn-outline-success" >JOIN ROOM</button>
            </div>
          </form>
          <div className="d-flex justify-content-center mt-4">
            {errorMsg && <h5>{errorMsg}</h5>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NameForm;