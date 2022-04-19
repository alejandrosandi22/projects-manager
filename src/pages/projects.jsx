import Cards from 'components/cards/cards';
import { getSession } from 'next-auth/react';
import styles from 'styles/projects.module.scss';

import { ALL_PROJECTS_QUERY, DELETE_PROJECT, CREATE_PROJECT } from '../../graphql/queries/projects';

import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect, useRef } from 'react';

import moment from 'moment';
import Button from 'components/button/button';
import CreateProject from 'components/modals/createProject';
import Input from 'components/input/input';
import { useDispatch, useSelector } from 'react-redux';
import DeleteProject from 'components/modals/deleteProject';

export default function Completed() {

  const [ allProjects, setAllProjects ] = useState(null);
  const projects = useRef();

  const { modals } = useSelector(state => state);
  const dispatch = useDispatch();
  
  const { loading, data } = useQuery(ALL_PROJECTS_QUERY, {variables: {completed: false}});
  console.log('DATA =>', data)


  const [ deleteProject, deleteProjectResult ] = useMutation(DELETE_PROJECT, {
    onError: () => {
      dispatch({
        type: '@alert/show',
        payload: {status: true, type: 'error', message: 'An error has occurred', seconds: 5},
      });
    }
  });

  const [ createdProject, createdProjectResult ] = useMutation(CREATE_PROJECT, {
    onError: (error) => {
      console.error(error)
    }
  });

  const modalsEvents = (name, value) => {
    dispatch({
      type: '@modal/open',
      payload: {name, value}
    });
  }

  const loadProjects = () => {
    if (data) {
      setAllProjects(
        data.getAllProjects.map((project) => {
          const { name,
            description,
            customField1,
            customField2,
            customField3,
            customField4,
            customField5,
            completed,
            createdAt,
            updatedAt,
            _id } = project;

            const customFields = [
              Object.keys(customField1).length !== 0 && customField1,
              Object.keys(customField2).length !== 0 && customField2,
              Object.keys(customField3).length !== 0 && customField3,
              Object.keys(customField4).length !== 0 && customField4,
              Object.keys(customField5).length !== 0 && customField5,
            ]
        })
      );
    }
  }

  useEffect(() => {
    if (createdProjectResult.data) modalsEvents('createProject', false);

    if (data) {
      setAllProjects(data.getAllProjects.map((project) => {

        const customFields = []

        for (let i = 1; i <= 5; i++) {
          if (Object.keys(eval(`project.customField${i}`)).length !== 0 ) {
            customFields.push(eval(`project.customField${i}`));
          }
        }

        return <Cards key={project._id}
        name={project.name}
        description={project.description}
        customFields={customFields}
        completed={project.completed} 
        id={project._id}
        createdAt={moment(project.createdAt).format('L')}
        updatedAt={moment(project.updatedAt, "YYYYMMDD").fromNow()}
        deleteProjectResult={deleteProjectResult.data}
        createdProjectResult={createdProjectResult.data}
        modalsEvents={modalsEvents} />
      }));
    }

  }, [data, deleteProjectResult.data, createdProjectResult.data]);

  if (loading) return <></>

  return (
    <>
    { modals.deleteProject.status && <DeleteProject modalsEvents={modalsEvents}
    deleteProject={deleteProject}
    deleteProjectResult={deleteProjectResult} /> }
    { modals.createProject && <CreateProject modalsEvents={modalsEvents} createdProject={createdProject} /> }
      <section className={styles.section}>
        <main className={styles.panel}>
          <Input type='text' label='Search:' placeholder='Project...' />
          <Button onClick={() => modalsEvents('createProject', true)} caption='Create Project' />
          <Button className='fal fa-sliders-h'/>
        </main>
        <div className={styles.cardContainer}>
        { allProjects }
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
