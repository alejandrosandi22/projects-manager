import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import styles from 'styles/signup.module.scss';

import Input from 'components/input';
import Switch from 'components/switch';
import SocialSignin from 'components/socialSignIn';
import Spinner from 'components/spinner';

import { setCookies } from 'cookies-next';

import { SIGN_UP_QUERY } from '../../graphql/queries/user';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

export default function Signup() {

  const [ credentials, setCredentials ] = useState({});
  const [ confirmPassword, setConfirmPassword] = useState('');
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDispatch = (type, payload) => {
    dispatch({
      type: type,
      payload: payload
    });
  }

  const [ signUp, signUpResult ] = useMutation(SIGN_UP_QUERY, {
    onError: (error) => {
      handleDispatch('@alert/show', {status: true, type: 'error', message: `${error.message}`, seconds: 5});
      setLoading(false);
    }
  })

  const handleSetCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    })
  }

  useEffect(() => {
    if (signUpResult.data) {
      const { value } = signUpResult.data.createUser;
      setCookies('manager-app-projects-user-token', value);

      handleDispatch(
        '@alert/show',
        {status: true, type: 'success', message: `Welcome! ${credentials.name} ${credentials.lastName}`, seconds: 5}
      );

      setLoading(false);

      router.push('/dashboard');
    }
  }, [signUpResult.data])

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleDispatch('@alert/show', {status: false});
    setLoading(true);

    if (loading) return;

    if (credentials.password !== confirmPassword) {
      setLoading(false);
      return handleDispatch('@alert/show', {status: true, type: 'warning', message: "Confirmed password don't match.", seconds: 5},);
    }

    signUp({ variables: {
       name: `${credentials.name} ${credentials.lastName}`,
      email: credentials.email,
      password: credentials.password,
    }});
   }

  return (
    <>
    <div className={`${styles.switchWrapper}`}>
      <Switch />
    </div>
      <section className={`${styles.section}`}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Input required={true} onChange={handleSetCredentials} type="text" label="Name" id="name"/>
            <Input required={true} onChange={handleSetCredentials} type="text" label="Last Name" id="lastName"/>
          </div>
          <div className={`${styles.emailWrapper}`}>
            <Input required={true} onChange={handleSetCredentials} type="email" label="Email" id="email"/>
          </div>
          <div>
            <Input required={true} onChange={handleSetCredentials} type="password" label="Password" id="password"/>
            <Input required={true} onChange={(e) => setConfirmPassword(e.target.value)} type="password" label="Confirm Password" id="confirmPassword"/>
          </div>
          <span>
            <button type="button">Cancel</button>
            <button type="submit" onSubmit={handleSubmit}>{ !loading ? 'Sign Up' : <Spinner /> }</button>
          </span>
        </form>
        <Link href="/signin">
          <a>Do you already have an account?</a>
        </Link>
        <h3>or</h3>
        <div>
          <SocialSignin />
        </div>
      </section>

    </>
  );
};
