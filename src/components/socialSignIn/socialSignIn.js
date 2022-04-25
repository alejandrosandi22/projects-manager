import styles from 'styles/socialSignin.module.scss';
import { signIn } from 'next-auth/react';

export default function SocialSignin() {

  const handleSignIn = (e) => {
    const { id } = e.target;
    signIn(id, {callbackUrl: '/dashboard'});
  }

  return (
    <>
      <button id="google" onClick={handleSignIn} className={`fab fa-google ${styles.button} ${styles.google}`}></button>
      <button id="facebook" onClick={handleSignIn} className={`fab fa-facebook ${styles.button} ${styles.facebook}`}></button>
      <button id="github" onClick={handleSignIn} className={`fab fa-github ${styles.button} ${styles.github}`}></button>
    </>
  );
}
