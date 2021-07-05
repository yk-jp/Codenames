import { FC, useState, useEffect, useRef } from 'react';

const NameForm: FC<any> = ({ setPlayerName, game, roomId }): JSX.Element => {
  const name = useRef<HTMLInputElement>(null);

  const joinRoom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    setPlayerName(name.current!.value);
    game.emit("store-player", name.current!.value, roomId);
  };

  // useEffect(() => {
  //   game.on("receive-player", (player: string) => {
  //     console.log(player);
  //     setPlayer(JSON.parse(player));
  //   });
  // })

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center mt-5">
        {/* name */}
        <div className="name d-flex flex-column">
          <div className="d-flex justify-content-center p-5">
            <input id="playerName" type="text" className="my-3 text-center" name="name" placeholder="ENTER YOUR NAME" ref={name} />
          </div>
          {/* Join room */}
          <div className="d-flex justify-content-center">
            <button id="nameBtn" type="submit" className="btn btn-outline-success" onClick={(e) => joinRoom(e)}>JOIN ROOM</button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default NameForm;