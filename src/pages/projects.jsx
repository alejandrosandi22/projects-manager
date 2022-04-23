import { getSession } from 'next-auth/react';
import { ALL_PROJECTS_QUERY } from '../../graphql/queries/projects';

import { useQuery } from '@apollo/client';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Cards from 'components/cards/cards';
import Button from 'components/button/button';
import Input from 'components/input/input';
import Spinner from 'components/spinner/spinner';
import styles from 'styles/projects.module.scss';
import moment from 'moment';

export default function Projects() {

  const search = useRef([]);
  const [ foundProjects, setFoundProjects ] = useState(<></>);

  const user = useSelector((state) => state.user);
  const { filter } = useSelector((state) => state.modals);
  const [ allProjects, setAllProjects ] = useState([]);
  const { loading, data } = useQuery(ALL_PROJECTS_QUERY, {
    variables: {
      filter: {sort: filter.sort, completed: filter.completed},
      userId: user ? user._id : ''
    }
  });

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

  }, [data, filter])

  const handleSearch = (e) => {
    const textToFind = e.target.value.toLowerCase();

    if (!data) return;

    search.current = data.getAllProjects.filter((project) => {
      const name = project.name.toLowerCase();
      const description = project.description.toLowerCase();
      return (name.includes(textToFind) || description.includes(textToFind)) 
    })

    setFoundProjects(search.current.map((project) => {
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
      })
    )


  }

  if (loading) return <Spinner />

  return (
    <>
      <section className={styles.section}>
        <main className={styles.panel}>
          <Input onChange={handleSearch} type='text' label='Search:' placeholder='Project...' />
          <Button onClick={() => modalsEvents('createProject', true)} caption='Create Project' />
          <Button onClick={() => {
            modalsEvents(
              'filter',
              {status: true,sort: filter.sort, completed: filter.completed})}
          } className='fal fa-sliders-h'/>
        </main>
        <div className={styles.cardContainer}>
          {
            search.current.length > 0
            ? foundProjects
            : allProjects.length > 0
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
