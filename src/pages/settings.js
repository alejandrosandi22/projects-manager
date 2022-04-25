import styles from 'styles/profile.module.scss';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../../graphql/queries/user';
import { removeCookies } from 'cookies-next';

import DeleteUser from 'components/modals/deleteUser';
import Switch from 'components/switch/switch';
import Spinner from 'components/spinner/spinner';

export default function Settings() {

  const router = useRouter();
  const { user } = useSelector(state => state);
  const [ showModal, setShowModal ] = useState(false);

  const [ deleteUser ] = useMutation(DELETE_USER, {
    onError: (error) => {
      console.error(error)
    }
  });

  const handleDeleteUser = async () => {
    await deleteUser({variables: {email: user.email}});
    removeCookies('manager-app-projects-user-token');
    signOut();
    router.push('/signin');
  }

  if (!user) return <Spinner />

  return (
    <>
    {
      showModal && <DeleteUser handleDeleteUser={handleDeleteUser} email={user.email} setShowModal={setShowModal} />
    }
    <div className={styles.switchWrapper}>
      <Switch />
    </div>
      <section className={styles.section}>
        <main>
          <img onError={({ currentTarget }) => currentTarget.src = '/default-user.png'} src={user.image} alt="photoURL" />
          <h2>{ user.name } <i className='fal fa-edit'></i></h2>
        </main>
        <aside>
          
        </aside>
        <button onClick={() => setShowModal(true)} className={styles.button}>Delete user</button>
      </section>
    </>
  );
}