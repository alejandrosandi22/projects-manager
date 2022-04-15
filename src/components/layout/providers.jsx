import { getSession, SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { createStore } from 'redux';

import apolloClient from 'services/apolloClient';
import { reducer } from '../../../store/reducer';

const store = createStore(reducer);

export default function Providers({ children, session }) {
  return(
    <>
    <ApolloProvider client={apolloClient}>
    <SessionProvider session={session}>
    <Provider store={store}>
      { children }
    </Provider>
    </SessionProvider>
    </ApolloProvider>
    </>
  );
}