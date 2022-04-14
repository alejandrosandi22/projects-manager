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

  const token = context.req.cookies['manager-app-projects-user-token'];

  if (!session && !token) return {
    redirect: {
      destination: '/signin',
      permanent: false
    }
  }

  return {
    props:{}
  }
}