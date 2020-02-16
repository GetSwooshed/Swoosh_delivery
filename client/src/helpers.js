import axios from 'axios';

export const getLocation = async () => {
  const res = await axios.get('http://ip-api.com/json')
  console.log('res', res.data);
  return res.data;
}