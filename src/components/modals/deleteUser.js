import Input from 'components/input';
import styles from 'styles/modals/deleteUser.module.scss';

export default function DeleteUser({ handleDeleteUser, email, setShowModal }) {
  return (
    <section className={styles.section}>
      <span>
        <main>
          <h3>Are you absolutely sure?</h3>
          <i onClick={() => setShowModal(false)} className="fal fa-times" />
        </main>
        <p>
          User with email
          <strong>{email}</strong>
          {' '}
          will delete permanently. You will not be able to recover your user account.
        </p>
        <Input required type="password" id="password" label="Password" />

        <button onClick={handleDeleteUser}>Delete user</button>
      </span>
    </section>
  );
}
