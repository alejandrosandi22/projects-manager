import Nav from 'components/nav/nav';
import Layout from 'components/layout';
import Providers from 'components/layout/providers';
import 'styles/globals.scss';

import { useRouter } from 'next/router';

export default function MyApp({ session, Component, pageProps, user }) {

  const { pathname } = useRouter();

  return(
    <Providers session={session}>
      <Layout>
          {
            pathname !== '/signin'  
            && pathname !== '/signup' 
            && pathname !== '/recovery' 
            && pathname !== '/' && <Nav />
          }
          <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
