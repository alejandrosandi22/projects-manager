import styles from 'styles/modal/deleteProject.module.scss';

export default function DeleteProject({setShowModal, name, handleDeleteProject}) {
  return(
    <section className={styles.section}>
      <span>
        <main>
        <h3>Are you absolutely sure?</h3>
          <i onClick={() => setShowModal(false)} className='fal fa-times'></i>
        </main>
        <p>You will delete <strong>{name}</strong> permanently. You will not be able to recover your project.</p>
        <div>
          <button onClick={() => setShowModal(false)} className={styles.cancel}>Cancel</button>
          <button onClick={() => handleDeleteProject()} className={styles.delete}>Delete</button>
        </div>
      </span>
    </section>
  );
}