import Input from 'components/input/input';
import styles from 'styles/modal/deleteUser.module.scss';

export default function DeleteUser({ handleDeleteUser, email, setShowModal }) {
  return(
    <section className={styles.section}>
      <span>
        <main>
          <h3>Are you absolutely sure?</h3>
          <i onClick={() => setShowModal(false)} className='fal fa-times'></i>
        </main>
        <p>User with email <strong>{email}</strong> will delete permanently. You will not be able to recover your user account.</p>
          <Input required={true} type='password' id='password' label='Password' />

        <button onClick={handleDeleteUser}>Delete user</button>
      </span>
    </section>
  );
}
