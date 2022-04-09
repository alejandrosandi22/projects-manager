import { signIn } from "next-auth/react";
import { signUpStyle } from "styles/signup.style";
import Switch from "components/switch/switch";
import Link from 'next/link'
import SocialSignin from "components/socialSignIn/socialSignIn";
import Input from "components/input/input";
import { useState } from "react";

const Signup = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/register', {
      method: 'POST',
      body: {email, password},
      headers: {'Content-Type': 'application/json'}
    })
  }

  return (
    <>
    <div className="switch-wrapper">
      <Switch />
    </div>
      <section>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Input type="text" label="Name" id="name"/>
            <Input type="text" label="Last Name" id="lastName"/>
          </div>
          <div className="email-wrapper">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" label="Email" id="email"/>
          </div>
          <div>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" id="password"/>
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
}

export default Signup;
