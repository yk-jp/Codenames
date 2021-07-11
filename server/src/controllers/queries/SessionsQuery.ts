import Sessions from "../../models/schema/Sessions";

export const session_find = async (sessionId: string) => {
  return await Sessions.findOne({ where: { sessionId: sessionId } });
}

export const session_insert = async (sessionId: string, playerId: string) => {
  await Sessions.create({ sessionId: sessionId, playerId: playerId })
    .then(() => {
      console.log("stored new session");
    })
    .catch(() => {
      console.log("could not store a new session");
    });
}
