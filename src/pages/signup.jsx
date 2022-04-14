import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import styles from 'styles/signup.module.scss';

import Alerts from 'components/alerts/alerts'
import Input from 'components/input/input';
import Switch from 'components/switch/switch';
import SocialSignin from 'components/socialSignIn/socialSignIn';
import Spinner from 'components/spinner/spinner';

import { setCookies } from 'cookies-next';

import { SIGN_UP_QUERY } from '../../graphql/queries/user';
import { useMutation } from '@apollo/client';

const Signup = () => {

  const [ credentials, setCredentials ] = useState({});
  const [ confirmPassword, setConfirmPassword] = useState('');
  const [ alert, setAlert ] = useState({status: false});
  const [ loading, setLoading ] = useState(false);

  const [ signUp, signUpResult ] = useMutation(SIGN_UP_QUERY, {
    onError: (error) => {
      console.log(error)
      console.log(error.message)
      setAlert({status: true, type: 'error', message: error.message});
      loading(false);
    }
  })

  const router = useRouter();

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

      setAlert({status: true, type: 'success', message: `Welcome! ${credentials.name} ${credentials.lastName}`});
      setLoading(false);

      router.push('/dashboard');
    }
  }, [signUpResult.data])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(false)
    setLoading(true);

    if (loading) return;

    if (credentials.password !== confirmPassword) {
      setAlert({status: true, type: 'warning', message: "Confirmed password don't match."});
      return setTimeout(() => setAlert(false), 5500);
    }

    signUp({ variables: {
      fullName: `${credentials.name} ${credentials.lastName}`,
      email: credentials.email,
      password: credentials.password,
    }});

   }

  return (
    <>
    {
      alert.status && <Alerts type={alert.type} message={alert.message} seconds={5} /> 
    }
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
            <button type="submit" onSubmit={handleSubmit}>Sign Up { loading && <Spinner /> }</button>
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

export default Signup;
