import { signIn } from 'next-auth/react';
import Alerts from 'components/alerts/alerts';
import { useState } from 'react';
import styles from 'styles/socialSignin.module.scss';

const SocialSignin = () => {
  const [ alert, setAlert ] = useState({state: false});


  const handleSignIn = (e) => {
    const { id } = e.target;

    setAlert({status: true, type: 'success', message: "Welcome"});
    signIn(id);
  }

  return (
    <>
      {
        alert.state && <Alerts message={alert.message} type={alert.type} seconds={5}/>
      }
      <button id="google" onClick={handleSignIn} className={`fab fa-google ${styles.button} ${styles.google}`}></button>
      <button id="facebook" onClick={handleSignIn} className={`fab fa-facebook ${styles.button} ${styles.facebook}`}></button>
      <button id="github" onClick={handleSignIn} className={`fab fa-github ${styles.button} ${styles.github}`}></button>
    </>
  );
}

export default SocialSignin;
