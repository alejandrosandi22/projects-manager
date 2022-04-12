import { getSession } from "next-auth/react";

const Dashboard = () => {

  return (
    <>
    </>
  );
}

export default Dashboard;

export const getServerSideProps = async (context) => {

  const session = await getSession(context);

  const user = context.req.cookies['user'];
  const token = context.req.cookies['token'];

  if (!session && !(user && token)) return {
    redirect: {
      destination: '/signin',
      permanent: false
    }
  }

  return {
    props:{}
  }
}