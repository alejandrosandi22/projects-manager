import { getCookie, setCookies } from 'cookies-next'; 

const initialState = {
  user: null,
  theme: getCookie('theme'),
  alert: {
    status: false,
    type: 'success',
    message: 'Default Message',
    seconds: 5,
  },
  modals: {
    createProject: false,
    deleteProject: false,
    deleteUser: false,
    filter: false,
  },
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case '@user/registered':
      if (action.payload) return state = { ...state, user: action.payload };
      break;
    
    case '@theme/mode':
      setCookies('theme', action.payload);
      return state = { ...state, theme: action.payload };

    case '@modal/open':
      return {...state, modals: {[action.payload.name]: action.payload.value}};

    case '@alert/show':
      return state = { ...state, alert: action.payload };

    default:
      break;
  }

  return state;
};

export { reducer };
