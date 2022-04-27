import Layout from 'components/layout';
import Providers from 'components/layout/providers';
import { getCookie } from 'cookies-next';
import 'styles/globals.scss';
import { verify } from 'jsonwebtoken';

export default function MyApp({
  session, Component, pageProps, user,
}) {
  return (
    <Providers session={session}>
      <Layout user={user}>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}

MyApp.getInitialProps = ({ ctx }) => {
  let user = null;
  try {
    const { req, res } = ctx;
    const token = getCookie('manager-app-projects-user-token', { req, res });
    if (!token) return {};
    user = verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new Error(error.message);
  }

  return { user };
};
