import { setCookies } from 'cookies-next';
import axios from 'axios';

export const signIn = async (credentials) => {

  let res = null;

  try {
    const { data } = await axios.post(`/api/login`, JSON.stringify(credentials), {
      headers: {'Content-Type': 'application/json'}
    })

    res = data;

    setCookies('token', data?.token);
    setCookies('user', JSON.stringify(data?.user));

  } catch (error) {
    res = error;
  }

  return res;
}