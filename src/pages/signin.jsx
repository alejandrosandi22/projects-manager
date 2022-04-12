import signInStyle from 'styles/signin.style';
import Switch from 'components/switch/switch';
import Link from 'next/link'
import SocialSignin from 'components/socialSignIn/socialSignIn';
import Input from 'components/input/input';
import axios from 'axios';
import Alerts from 'components/alerts/alerts';
import { useState } from 'react';
import { getSession } from 'next-auth/react';
import { setCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import Spinner from 'components/spinner/spinner';

 const SignIn = () => {

  const router = useRouter();
  const [ credentials, setCredentials ] = useState();
  const [ alert, setAlert ] = useState({email: '', password: '',status: false});
  const [ loading, setLoading ] = useState(false);

  const handleSetCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({...alert, status: false})
    setLoading(true);

     try {
      const { data } = await axios.post(`/api/login`, JSON.stringify(credentials), {
        headers: {'Content-Type': 'application/json'}
      })

      setAlert({status: true, type: 'success', message: `Welcome ${data.user.fullName}`});

      setCookies('token', data?.token);
      setCookies('user', JSON.stringify(data?.user));

      router.push('/dashboard');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.status === 404) setAlert({status: true, type: 'error', message: error.response.data.message});
      if (error.response.status === 400) setAlert({status: true, type: 'error', message: error.response.data.message});
    } 
  }

  return(
    <>
    {
      alert.status && <Alerts type={alert.type} message={alert.message} seconds={5} /> 
    }
    <div className="switch-wrapper">
      <Switch />
    </div>
      <section>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <Input onChange={handleSetCredentials} type="email" label="Email" id="email"/>
          <Input onChange={handleSetCredentials} type="password" label="Password" id="password"/>
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

      <style jsx>{signInStyle}</style>
    </>
  );
}

export default SignIn;

export const getServerSideProps = async (context) => {

  const session = await getSession(context);

  const user = context.req.cookies['user'];
  const token = context.req.cookies['token'];

  if (session || (user && token)) return {
    redirect: {
      destination: '/dashboard',
      permanent: false
    }
  }

  return {
    props:{}
  }
}