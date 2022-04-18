import Cards from 'components/cards/cards';
import { getSession } from 'next-auth/react';
import styles from 'styles/projects.module.scss';

import { ALL_PROJECTS_QUERY } from '../../graphql/queries/projects';
import { useQuery } from '@apollo/client';
import { useState, useEffect, useRef } from 'react';
import DeleteProject from 'components/modals/deleteProject';

import { DELETE_PROJECT } from '../../graphql/queries/projects';
import { useMutation } from '@apollo/client';
import Alerts from 'components/alerts/alerts';

import moment from 'moment';
import Button from 'components/button/button';
import CreateProject from 'components/modals/createProject';
import Input from 'components/input/input';
import { useDispatch, useSelector } from 'react-redux';

export default function Completed() {

  const [ completedProjects, setCompletedProjects ] = useState(null);
  const [ deleteProjectModal, setDeleteProjectModal ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const [ showAlert, setShowAlert ] = useState(false);
  const deleteId = useRef(null);

  const { modals } = useSelector(state => state);
  const dispatch = useDispatch();
  
  const { loading, data } = useQuery(ALL_PROJECTS_QUERY, {variables: {completed: false}});
  const [ deleteProject, deleteProjectResult ] = useMutation(DELETE_PROJECT, {
    onError: (error) => {
      console.error(error)
    }
  });

  const showDeleteProjectModal = (id, name) => {
    deleteId.current = id;
    setShowModal(true);
    setDeleteProjectModal();
  }

  const handleDeleteProject = async () => {
    setShowAlert(false);
    console.log(deleteId.current)
    await deleteProject({variables: {id: deleteId.current}})
    console.log(deleteProjectResult)
    if (deleteProjectResult) setShowModal(false);
    setShowAlert(true);
  }

  const foo = () => {
    dispatch({
      type: '@modal/open',
      payload: {name: 'createProject', value: true}
    });
  }

  useEffect(() => {
    if (data) {
      setCompletedProjects(data.allProjects.map((project) => {
        const { name, description, customField1, customField2, customField3, customField4, customField5, completed, createdAt, updatedAt, _id } = project;

        const customFields = [
          Object.keys(customField1).length !== 0 && customField1,
          Object.keys(customField2).length !== 0 && customField2,
          Object.keys(customField3).length !== 0 && customField3,
          Object.keys(customField4).length !== 0 && customField4,
          Object.keys(customField5).length !== 0 && customField5,
        ]
        return <Cards key={_id}
        name={name}
        description={description}
        customFields={customFields}
        completed={completed} 
        id={_id}
        createdAt={moment(createdAt).format('L')}
        updatedAt={moment(updatedAt, "YYYYMMDD").fromNow()}
        showDeleteProjectModal={showDeleteProjectModal} />
      }))
    }

  }, [data, deleteProjectResult.data]);

  if (loading) return <></>

  return (
    <>
    { modals.deleteProject && <DeleteProject handleDeleteProject={handleDeleteProject} setShowModal={setShowModal} name={name}/> }
    { modals.createProject && <CreateProject /> }
    { showAlert && <Alerts type="success" message="Deleted project successfully" /> }
      <section className={styles.section}>
        <main className={styles.panel}>
          <Input type='text' label='Search:' placeholder='Project...' />
          <Button onClick={() => foo()} caption='Create Project' />
          <Button className='fal fa-sliders-h'/>
        </main>
        <div className={styles.cardContainer}>
        {completedProjects}
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
