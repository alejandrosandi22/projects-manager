import styles from 'styles/modals/deleteProject.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ALL_PROJECTS_QUERY, DELETE_PROJECT } from '../../../graphql/queries/projects';
import { useMutation } from '@apollo/client';

export default function DeleteProject({ modalsEvents }) {

  const [ hidde, setHidde ] = useState(false);
  const user = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.modals.deleteProject);
  const dispatch = useDispatch();

  const [ deleteProject ] = useMutation(DELETE_PROJECT, {
    refetchQueries: () => [{
      query: ALL_PROJECTS_QUERY,
      variables: {
        filter: {sort: '', completed: false},
        userId: user._id,
      }
    }],
    onError: () => {
      dispatch({
        type: '@alert/show',
        payload: {status: true, type: 'error', message: 'An error has occurred', seconds: 5},
      });
    },
    onCompleted: () => {
      dispatch({
        type: '@alert/show',
        payload: {status: true, type: 'success', message: `${data.name} deleted successfully`, seconds: 5}
      });
      closeModal();
    },
  });

  const handleDeleteProject = async () => {
    await deleteProject({variables: {id: data.id}})
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
