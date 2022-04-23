import { useMutation } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styles from 'styles/cards.module.scss';
import { ALL_PROJECTS_QUERY, COMPLETE_PROJECT } from '../../../graphql/queries/projects';

function Cards(props) {

  const checkbox = useRef(<input/>);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.modals.filter);
  const user = useSelector((state) => state.user);

  const [ completeProject ] = useMutation(COMPLETE_PROJECT, {
    refetchQueries: () => [{
      query: ALL_PROJECTS_QUERY,
      variables: {
        filter: {sort: filter.sort, completed: filter.completed},
        userId: user._id,
      },
      options: {
        awaitRefetchQueries: true
      },
    }],
    onError: (error) => {
      console.error(error)
      dispatch({
        type: '@alert/show',
        payload: {status: true, type: 'error', message: 'An error has occurred', seconds: 5},
      });
    },
    onCompleted: () => {
      dispatch({
        type: '@alert/show',
        payload: {status: true, type: 'success', message: 'Successfully', seconds: 5}
      });
    },
  });

  const openEditProjectsModal = (data) => {

    const projectData = Object.create({...data});

    projectData = {...data}

    delete projectData.createdAt;
    delete projectData.createdAt;
    delete projectData.updatedAt;
    delete projectData.modalsEvents;
    delete projectData.key;

    props.modalsEvents(
      'createProject',
      {
        status: true,
        functionality: 'edit',
        data: projectData
      }
    )
  }

  const openDeleteProjectModal = (id, name) => {
    props.modalsEvents(
      'deleteProject',
      {
        status: true,
        data: {id,name}
      }
    )
  }

  const handleCompleteProject = (e) => {
    if (e.target.checked) return completeProject({variables: {completed: true, id: props.id}});
    return completeProject({variables: {completed: false, id: props.id}});
  }

  useEffect(() => {
    if (props.completed) checkbox.current.checked = true;
  }, [props])

    return(
      <>
      <div className={styles.card}>
        <div className={styles['card-wrapper']}>
          <h1><input ref={checkbox}
          onChange={handleCompleteProject}
          type="checkbox"
          name="completed"
          id="completed" /> {props.name} <em>Created on: {props.createdAt} <br/>Last update: {props.updatedAt}</em></h1>
          <h2>{props.description}</h2>
          {
            props.customFields.map((field, index) => {
              if (!field) return;
              return(
                <span key={index + 50}>
                  <h3>{field.name}:</h3>
                  <h4>{field.content}</h4>
                </span>
              );
            })
          }
        </div>
        <span>
          <button onClick={() => openEditProjectsModal(props)} className={`fas fa-edit ${styles.edit}`}></button>
          <button onClick={() => openDeleteProjectModal(props.id, props.name)} className={`fas fa-trash ${styles.trash}`}></button>
        </span>
      </div>
    </>
  );
}

export default React.memo(Cards);