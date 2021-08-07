const Storage = () => {
  // playerId
  const playerId: string = sessionStorage.getItem("playerId") as string;
  // spymaster or not 
  const isSpymaster: string = sessionStorage.getItem("isSpymaster") as string;
  // room id
  const roomId: string = window.location.pathname.split("/").pop() as string;
  // language
  const language: string = sessionStorage.getItem("language") as string;
  // log
  const log: string = sessionStorage.getItem("log") as string;

  return { playerId, roomId, log, language, isSpymaster };
};

export default Storage;
