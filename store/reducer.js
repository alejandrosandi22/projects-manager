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
    project: {
      status: false,
      data: {},
    },
    createProject: {
      status: false,
      functionality: 'create',
    },
    deleteProject: {
      status: false,
      data: { id: null, name: null },
    },
    deleteUser: false,
    filter: {
      status: false,
      sort: '',
      completed: false,
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case '@user/registered':
      if (action.payload) {
        state = { ...state, user: action.payload };
        return state;
      }
      break;

    case '@theme/mode':
      setCookies('theme', action.payload);
      state = { ...state, theme: action.payload };
      return state;

    case '@modal/open':
      return { ...state, modals: { ...state.modals, [action.payload.name]: action.payload.value } };

    case '@alert/show':
      state = { ...state, alert: action.payload };
      return state;

    default:
      break;
  }

  return state;
};

export { reducer };
