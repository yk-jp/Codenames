const Storage = () => {
  // playerId
  const playerId: string = sessionStorage.getItem("playerId") as string;
  // player name
  const playerName: string = sessionStorage.getItem("playerName") as string;
  // spymaster or not 
  const isSpymaster: string = sessionStorage.getItem("isSpymaster") as string;
  // room id
  const roomId: string = window.location.pathname.split("/").pop() as string;
  // language
  const language: string = sessionStorage.getItem("language") as string;
  // log
  const log: string = sessionStorage.getItem("log") as string;
  // initialized or not
  const isAlreadyInitialized: string | null = sessionStorage.getItem("isAlreadyInitialized") as string;

  return { playerId, playerName, roomId, log, language, isSpymaster,isAlreadyInitialized };
};

export default Storage;
