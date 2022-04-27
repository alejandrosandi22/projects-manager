import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alerts from 'components/alerts';
import Modals from 'components/modals';
import { CURRENT_USER_QUERY } from '../../../graphql/queries/user';
import { useQuery } from '@apollo/client';
import Spinner from 'components/spinner/spinner';
import Nav from 'components/nav/nav';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  
  const theme = useSelector((state) => state.theme);
  const [ themeMode, setThemeMode ] = useState('lightMode');
  const dispatch = useDispatch();
  const { loading, data } = useQuery(CURRENT_USER_QUERY);
  const { pathname } = useRouter();

  useEffect(() => {
    if (data) {
      dispatch({
        type: '@user/registered',
        payload: data.currentUser,
      })
    }
  }, [data])


  useEffect(() => {
    setThemeMode(`${theme ? 'darkMode' : 'lightMode'}`);
  }, [theme])

  if (loading) {
    return <Spinner />
  }

  return(
    <>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content="144603059402-7g949992apamrckos0d5njn3jp2a8vru.apps.googleusercontent.com"></meta>
      </Head>
      <div data='data' className={`App ${themeMode}`}>
          {
            pathname !== '/signin'  
            && pathname !== '/signup' 
            && pathname !== '/recovery' 
            && pathname !== '/' && <Nav />
          }
        { children }
        <Alerts />
        <Modals />
      </div>
    </>
  );
}