import Head from 'next/head';
import globals from 'styles/globals';
import { SessionProvider } from 'next-auth/react';
import Nav from 'components/nav/nav';
import { useRouter } from 'next/router';
      
function MyApp({ session, Component, pageProps }) {

  const router = useRouter();
  const { pathname } = router;


  return(
    <>
      <Head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
        <title>Projects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        pathname !== '/signin'
        && pathname !== '/signup'
        && pathname !== '/recovery'
        && pathname !== '/' && <Nav />
      }

      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      
      <style jsx global>{globals}</style>
    </>
  );
  
  
}

export default MyApp;
