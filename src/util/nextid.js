
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.web3.bio'
})


export const getProfilesForIdentity = (identity) => {
  const url = `/profile/${identity}`;
  return axiosInstance.get(url);
}

