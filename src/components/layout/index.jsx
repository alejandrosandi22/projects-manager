import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../../../graphql/queries/user';

import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'components/spinner/spinner';
import Alerts from 'components/alerts/alerts';
import DeleteProject from 'components/modals/deleteProject';
import CreateProject from 'components/modals/createProject';

export default function Layout({ children }) {
  
  const { theme, alert, modals } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  const [ themeMode, setThemeMode ] = useState('lightMode');
  const [ modalToShow, setModalToShow ] = useState(<></>);

  const { data: session, status } = useSession();
  const { loading, data } = useQuery(CURRENT_USER_QUERY);


  useEffect(() => {

    const {
      createProject,
      deleteProject,
      deleteUser,
      filter
    } = modals;
    
    if (createProject) return setModalToShow(<CreateProject />);
    if (deleteProject.status) return setModalToShow(<DeleteProject />);
    return setModalToShow(<></>);


  }, [modals])

  useEffect(() => {
    setThemeMode(`${theme ? 'darkMode' : 'lightMode'}`);
    if (data) dispatch({type: '@user/registered', payload: data.currentUser});
    if (session) dispatch({type: '@user/registered', payload: session.user});

  }, [theme, data, session])

  if (status === 'loading' || loading) {
    return (
      <>
      <div className='spinner-wrapper'>
        <Spinner />
      </div>
      <style jsx>
      {`
        .spinner-wrapper{
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}
      </style>
      </>
    );
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
      <div className={`App ${themeMode}`}>
        {children}
      </div>
      {
        alert.status && <Alerts type={alert.type} message={alert.message} seconds={alert.seconds}/>
      }

    </>
  );
}
