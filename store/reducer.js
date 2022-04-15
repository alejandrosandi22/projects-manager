import { getCookie, setCookies } from 'cookies-next'; 

const initialState = {
  user: null,
  theme: getCookie('theme'),
};

const reducer = (state = initialState, action) => {
  if (action.type === '@user/registered') {
    if (action.payload) return state = { ...state, user: action.payload };
  }
  if (action.type === '@theme/mode') {
    setCookies('theme', action.payload);
    return state = { ...state, theme: action.payload };
  }
  return state;
};

export { reducer };
