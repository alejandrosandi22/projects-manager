import { useEffect, useState } from 'react';
import styles from 'styles/socialSignin.module.scss';
import { SOCIAL_SIGN_IN } from '../../../graphql/queries/user';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
export default function SocialSignIn() {
  return(
    <>
      <a href='api/auth/google' className={`fab fa-google ${styles.a} ${styles.google}`}></a>
      <a href='api/auth/facebook' className={`fab fa-facebook ${styles.a} ${styles.facebook}`}></a>
      <a href='api/auth/github' className={`fab fa-github ${styles.a} ${styles.github}`}></a>
    </>
  );
}