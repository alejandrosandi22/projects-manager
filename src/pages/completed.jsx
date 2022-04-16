import Cards from 'components/cards/cards';
import { getSession } from 'next-auth/react';
import styles from 'styles/completed.module.scss';

export default function Completed() {
  return (
    <>
      <section className={styles.section}>
        <main>
          <input type="text" placeholder='Search' />
          <button className='fal fa-filter'> More Filters</button>
        </main>
        <div>
          <Cards />
        </div>
      </section>
    </>
  );
}

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