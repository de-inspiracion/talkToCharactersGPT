import axios from 'axios';
const base_url = import.meta.env.VITE_BASE_URL

const post = async (path: any, body: any) => {
  const url = base_url + path
  return await axios.post(url, body)
}
export {
  post
}