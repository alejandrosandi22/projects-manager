import Head from 'next/head';
import 'styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import Nav from 'components/nav/nav';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useLocalStorage from 'services/localStorage';


export const ThemeContext = React.createContext(null);
 
function MyApp({ session, Component, pageProps }) {

  const [ theme, setTheme ] = useLocalStorage('theme', false);

  const [ mode, setMode ] = useState();

  const { pathname } = useRouter();

  useEffect(() => {
    const storage = window.localStorage.getItem('theme');
    setMode(Boolean(storage));
  }, [theme])

  const changeTheme = () => {
    if (theme) {
      setTheme(false);
      setMode(false);
    }
    else {
      setTheme(true);
      setMode(true);
    }
  }

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
      <ThemeContext.Provider value={{changeTheme, theme}}>
        <SessionProvider session={session}>
          <div className={`App ${mode}`}>
            { 
              pathname !== '/signin'  
              && pathname !== '/signup' 
              && pathname !== '/recovery' 
              && pathname !== '/' && <Nav />  
            } 

            <Component {...pageProps} />
          </div>
        </SessionProvider>
      </ThemeContext.Provider>
    </>
  );
  
  
}

export default MyApp;