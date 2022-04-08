import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Home({ session }) {
  return (
    <>
      <button onClick={signOut}>
        Sign Out
      </button>
    </>
  )
}

export const getServerSideProps= async (context) => {
  const session = await getSession(context);

  if (!session) return {
    redirect: {
      destination: '/signin',
      permanent: false
    }
  }

  return {
    props: {
      session
    }
  }
}