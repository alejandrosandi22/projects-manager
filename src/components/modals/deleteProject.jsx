import styles from 'styles/modal/deleteProject.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function DeleteProject({ modalsEvents, deleteProject, deleteProjectResult }) {

  const [ hidde, setHidde ] = useState(false);
  const { data } = useSelector((state) => state.modals.deleteProject);
  const dispatch = useDispatch();

  const handleDeleteProject = async () => {
    await deleteProject({variables: {id: data.id}})
    if (deleteProjectResult) {
      dispatch({
        type: '@alert/show',
        payload: {status: true, type: 'success', message: `${data.name} deleted successfully`, seconds: 5}
      });

      closeModal();
    }
  }

  const closeModal = () => {
    setHidde(true);
    setTimeout(() => {
      setHidde(false);
      modalsEvents(
        'deleteProject', {
        status: false,
        data: {}
      })
    }, 300)
  }

  return(
    <section className={`${styles.section} ${hidde && styles.hidde}`}>
      <span>
        <main>
        <h3>Are you absolutely sure?</h3>
          <i onClick={() => closeModal()} className='fal fa-times'></i>
        </main>
        <p>You will delete <strong>{data.name}</strong> permanently. You will not be able to recover your project.</p>
        <div>
          <button onClick={() => closeModal()} className={styles.cancel}>Cancel</button>
          <button onClick={() => handleDeleteProject()} className={styles.delete}>Delete</button>
        </div>
      </span>
    </section>
  );
}
