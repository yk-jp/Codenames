import axios from 'axios';

export const postDataForForm = (playerName: string, roomId: string, URI: string) => {
  return axios.post(URI, {
    playerName: playerName,
    roomId: roomId
  },
    { withCredentials: true }
  )
};