import { signInStyle } from "styles/signin.style";
import Switch from "components/switch/switch";
import Link from 'next/link'
import SocialSignin from "components/socialSignIn/socialSignIn";
import Input from "components/input/input";

export default function SignIn() {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return(
    <>
    <div className="switch-wrapper">
      <Switch />
    </div>
      <section>
        <h2>Sign In</h2>
        <form>
          <Input type="email" label="Email" id="email"/>
          <Input type="password" label="Password" id="password"/>
          <button onSubmit={handleSubmit}>Sign In</button>
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
