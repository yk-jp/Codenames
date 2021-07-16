import axios from 'axios';

export const postDataForForm = (data: string, URI: string) => {
  return axios.post(URI, {
    playerName: data
  },
    { withCredentials: true }
  )
};