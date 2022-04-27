import styles from 'styles/socialSignin.module.scss';

export default function SocialSignIn() {
  return (
    <>
      <a href="api/auth/google" className={`fab fa-google ${styles.socialButtons} ${styles.google}`} />
      <a href="api/auth/facebook" className={`fab fa-facebook ${styles.socialButtons} ${styles.facebook}`} />
      <a href="api/auth/github" className={`fab fa-github ${styles.socialButtons} ${styles.github}`} />
    </>
  );
}
