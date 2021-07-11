import { FC, useState, useEffect, useRef } from 'react';
import axios from 'axios';
const NameForm: FC<any> = ({ game, roomId }): JSX.Element => {
  const name = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const joinRoom = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios.post("http://localhost:3001/form", {
      playerName: JSON.stringify(name.current!.value) as string
    },
      { withCredentials: true }
    ).then((res) => {
    }).catch((err) => {
      setErrorMsg("JOIN FAILED");
    });
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