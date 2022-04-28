import Layout from 'components/layout';
import Providers from 'components/layout/providers';
import 'styles/globals.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
