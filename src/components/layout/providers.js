import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { createStore } from 'redux';
import apolloClient from 'services/apolloClient';
import { reducer } from '../../../store/reducer';

const store = createStore(reducer);

export default function Providers({ children }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        { children }
      </Provider>
    </ApolloProvider>
  );
}
