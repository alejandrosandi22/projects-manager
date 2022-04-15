import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import Link from 'next/link'
import styles from 'styles/signin.module.scss';

import Switch from 'components/switch/switch';
import Alerts from 'components/alerts/alerts';
import Spinner from 'components/spinner/spinner';
import Input from 'components/input/input';
import SocialSignin from 'components/socialSignIn/socialSignIn';

import { useMutation } from '@apollo/client';
import { SIGN_IN_QUERY } from '../../graphql/queries/user';

import { setCookies } from 'cookies-next';

export default function SignIn() {

  const [ credentials, setCredentials ] = useState();
  const [ alert, setAlert ] = useState({email: '', password: '',status: false});
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();

  const [ signIn, signInResult ] = useMutation(SIGN_IN_QUERY, {
    onError: (error) => {
      setAlert({status: true, type: 'error', message: `${error.message}`});
      setLoading(false);
    }
  });

  useEffect(() => {
    if (signInResult.data) {
      const { value } = signInResult.data.signIn;
      setCookies('manager-app-projects-user-token', value);

      setAlert({status: true, type: 'success', message: 'Welcome!'});
      setLoading(false);

      router.push('/dashboard');
    }
  }, [signInResult.data])

  const handleSetCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({...alert, status: false});
    setLoading(true);

    signIn({ variables: {email: credentials.email, password: credentials.password} });
  }

  return(
    <>
    {
      alert.status && <Alerts type={alert.type} message={alert.message} seconds={5} /> 
    }
    <div className={styles.switchWrapper}>
      <Switch />
    </div>
      <section className={styles.section}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <Input required={true} onChange={handleSetCredentials} type="email" label="Email" id="email"/>
          <Input required={true} onChange={handleSetCredentials} type="password" label="Password" id="password"/>
          <button onSubmit={handleSubmit}>Sign In { loading && <Spinner /> }</button>
        </form>
        <span>
          <Link href="/recovery">
            <a>Forget your password?</a>
          </Link>
          <Link href="/signup">
            <a>You don't hava an account?</a>
          </Link>
        </span>
        <h3>or</h3>
        <div>
          <SocialSignin />
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async (context) => {

  const session = await getSession(context);

  const token = context.req.cookies['manager-app-projects-user-token'];

  if (session || token) return {
    redirect: {
      destination: '/dashboard',
      permanent: false
    }
  }

  return {
    props:{}
  }
}