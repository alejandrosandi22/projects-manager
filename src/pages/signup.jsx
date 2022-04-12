import signUpStyle from 'styles/signup.style';
import Switch from 'components/switch/switch';
import Link from 'next/link'
import SocialSignin from 'components/socialSignIn/socialSignIn';
import Input from 'components/input/input';
import { useState } from 'react';
import axios from 'axios';
import { setCookies } from 'cookies-next';
import Alerts from 'components/alerts/alerts'

const Signup = () => {

  const [ credentials, setCredentials ] = useState({});
  const [ alert, setAlert ] = useState({email: '', password: '',status: false});

  const handleSetCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({...alert, status: false})

    try {
      const { data } = await axios.post(`/api/register`, JSON.stringify(credentials), {
        headers: {'Content-Type': 'application/json'}
      })
      
      setAlert({status: true, type: 'success', message: `Welcome ${credentials.name} ${credentials.lastName}`});

      setCookies('token', data?.token);
      setCookies('user', JSON.stringify(data?.user));

    } catch (error) {
      if (error.response.status === 422) setAlert({status: true, type: 'error', message: error.response.data.message});
      setAlert({status: true, type: 'error', message: error.response.data.message});
    }

  }

  return (
    <>
    {
      alert.status && <Alerts type={alert.type} message={alert.message} seconds={5} /> 
    }
    <div className="switch-wrapper">
      <Switch />
    </div>
      <section>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Input onChange={handleSetCredentials} type="text" label="Name" id="name"/>
            <Input onChange={handleSetCredentials} type="text" label="Last Name" id="lastName"/>
          </div>
          <div className="email-wrapper">
            <Input onChange={handleSetCredentials} type="email" label="Email" id="email"/>
          </div>
          <div>
            <Input onChange={handleSetCredentials} type="password" label="Password" id="password"/>
            <Input type="password" label="Confirm Password" id="confirmPassword"/>
          </div>
          <span>
            <button type="button">Cancel</button>
            <button type="submit" onSubmit={handleSubmit}>Sign Up</button>
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

      <style jsx>{signUpStyle}</style>
    </>
  );
};

export default Signup;
