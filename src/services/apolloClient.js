import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { getCookie } from 'cookies-next';

const getAuth = () => {
  const token = getCookie('manager-app-projects-user-token');
  return token ? `bearer ${token}` : null;
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      authorization: getAuth(),
    },
    uri: process.env.CLIENT_URI,
  }),
});

export default client;
