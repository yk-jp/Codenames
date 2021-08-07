import { useEffect, useState, useContext } from 'react';
// config 
import Storage from '../../config/storage';
// context
import { SocketContext } from '../../context/SocketContext';
import { GameDataContext } from '../../context/GameDataContext';
const SpymasterController = () => {
  // data from localstorage
  const { playerId, roomId, isSpymaster } = Storage();
  // context
  const socket = useContext(SocketContext);
  const { tableData, playerData } = useContext(GameDataContext);
  // useState
  const [isSpymasterDisabled, setIsSpymasterDisabled] = useState<boolean>(true);
  const [isSpymasterActive, setIsSpymasterActive] = useState<boolean>(false);

  const disableSpymasterBtnController = () => {
    if (tableData.table.status !== "PLAYING") return;
    if ((playerData.player.team === "RED" && tableData.table.redTeam.phase === "GIVING A CLUE" && !tableData.table.redTeam.spymaster) || (playerData.player.team === "BLUE" && tableData.table.blueTeam.phase === "GIVING A CLUE" && !tableData.table.blueTeam.spymaster)) {
      setIsSpymasterDisabled(false);
    }
    else setIsSpymasterDisabled(true);
  };

  const activateSpymasterController = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      sessionStorage.setItem("isSpymaster", "true");
      socket.emit("activate-spymaster", playerId, roomId);
      setIsSpymasterActive(true);
    }
  };

  useEffect(() => {
    setIsSpymasterActive(isSpymaster === "true");
    // // spymaster button enable or disable
    disableSpymasterBtnController();
  }, [tableData.table]);

  useEffect(() => {
    socket.on("activate-spymaster", (team: string) => {
      if (playerData.player.team === team) setIsSpymasterDisabled(true);
    });

    socket.on("reset-spymaster", () => {
      sessionStorage.removeItem("isSpymaster");
      setIsSpymasterDisabled(true);
      setIsSpymasterActive(false);
    });

    socket.on("alert-for-spymaster", (message: string, team: string) => {
      if (playerData.player.team === team) {
        // enable players to hit the button
        setIsSpymasterDisabled(false);
        return alert(message);
      }
    });

    return () => {
      socket.off("activate-spymaster");
      socket.off("alert-for-spymaster");
      socket.off("reset-spymaster");
    };
  }, [socket]);

  return {isSpymasterDisabled,isSpymasterActive,activateSpymasterController};
};


export default SpymasterController;