import Layout from 'components/layout';
import Providers from 'components/layout/providers';
import 'styles/globals.scss';

export default function MyApp({ session, Component, pageProps }) {
  return(
    <Providers session={session}>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
