import { getSession } from 'next-auth/react';

import { ALL_PROJECTS_QUERY } from '../../graphql/queries/projects';

import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Cards from 'components/cards/cards';
import Button from 'components/button/button';
import Input from 'components/input/input';
import Spinner from 'components/spinner/spinner';
import styles from 'styles/projects.module.scss';
import moment from 'moment';

export default function Projects() {

  const user = useSelector((state) => state.user);
  const [ allProjects, setAllProjects ] = useState([]);
  const { loading, data } = useQuery(ALL_PROJECTS_QUERY, {variables: {completed: false, userId: user ? user._id : ''}});

  const dispatch = useDispatch();

  const modalsEvents = (name, value) => {
    dispatch({
      type: '@modal/open',
      payload: {name, value}
    });
  }

  useEffect(() => {
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
        modalsEvents={modalsEvents} />
      }));
    }

  }, [data])

  if (loading) return <Spinner />

  return (
    <>
      <section className={styles.section}>
        <main className={styles.panel}>
          <Input type='text' label='Search:' placeholder='Project...' />
          <Button onClick={() => modalsEvents('createProject', true)} caption='Create Project' />
          <Button className='fal fa-sliders-h'/>
        </main>
        <div className={styles.cardContainer}>
        {
          allProjects.length > 0
          ? allProjects
          : <div className={styles.empty}>
              <i className='fal fa-folder-open'></i>
              <h1>No Proyects</h1>
            </div>
        }
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
