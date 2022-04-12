import { signIn } from "next-auth/react";
 

const SocialSignin = () => {
  return (
    <>
      <button onClick={() => signIn('google')} className="fab fa-google"></button>
      <button onClick={() => signIn('facebook')} className="fab fa-facebook"></button>
      <button onClick={() => signIn('github')} className="fab fa-github"></button>

      <style jsx>
      {`
        button {
          border: none;
          border-radius: 50%;
          width: 2.5rem;
          height: 2.5rem;
          font-size: 1rem;
          color: #E0E0E0;
          box-shadow: 0 0 .5rem var(--darkShadow);
          cursor: pointer;
          &:hover {
            filter: brightness(105%);
          }
          &:active {
            transform: scale(.9);
          }
        }
        .fa-google {
          background: #D1473B;
        }
        .fa-facebook {
          background: #3B5792;
        }
        .fa-github {
          background: #22272b;
        }  
      `}
      </style>
    </>
  );
}

export default SocialSignin;
