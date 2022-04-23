import { useQuery } from '@apollo/client';
import Spinner from 'components/spinner/spinner';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from 'styles/dashboard.module.scss';
import { ALL_PROJECTS_QUERY } from '../../graphql/queries/projects';

export default function Dashboard() {

  const { user } = useSelector((state) => state);
  const [ completed, setCompleted ] = useState([]);
  const [ statistics, setStatistics ] = useState({});
  const [ latest, setLatest ] = useState([]);

  const { loading, refetch, data } = useQuery(ALL_PROJECTS_QUERY, {
    variables: {
      filter: {
        sort: 'latest', completed: false
      },
      userId: user && user._id,
    },
  })

  useEffect(() => {
    let totalProjects = [];
    let completedProjects = [];

    refetch(ALL_PROJECTS_QUERY, {
      variables: {
        filter: {
          sort: 'latest', completed: false
        },
        userId: user && user._id,
      },
    });

    if (data) {
      setLatest(data.getAllProjects[0]);
      setCompleted(data.getAllProjects.map((project, index) => {
        totalProjects.push(index)
        if (project.completed) {
          completedProjects.push(index)
          return <Card key={project._id} name={project.name}/>
        }
      }))
    }

    setStatistics({
      "projects": totalProjects.length,
      "completed": Math.trunc((completedProjects.length * 100) / totalProjects.length),
    })
  }, [data])


  if (loading) return <Spinner />

  return (
    <section className={styles.section}>
    <div className={styles.statistics}>
      <table>
        <caption>Statistics</caption>
        <tbody>
          <tr>
            <th>Projects</th>
            <th>Completed</th>
          </tr>
          <tr>
            <td>{ statistics.projects }</td>
            <td>{ statistics.completed }%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className={styles.completed}>
      <h2>Completed Projects</h2>
      <div className={styles.cardsWrapper}>
        <span>
        { completed }
        </span>
      </div>
    </div>
    <div className={styles.latest}>
      <h2>Latest Project</h2>
      <LatestCard name={latest.name} description={latest.description} />
    </div>
    </section>
  );
}

export function Card({ name }) {
  return(
    <div className={styles.card}>
      <h3>{ name }</h3>
      <a href="/projects">See project</a>
    </div>
  );
}

export function LatestCard({ name, description }) {
  return(
    <div className={styles.latestCard}>
      <h3>{name}</h3>
      <h4>{description}</h4>
    </div>
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