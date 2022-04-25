import Spinner from 'components/spinner/spinner';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Cards from 'components/cards/cards';
import { ALL_PROJECTS_QUERY } from '../../graphql/queries/projects';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import styles from 'styles/dashboard.module.scss';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function Dashboard({ user }) {

  const [ completed, setCompleted ] = useState([]);
  const [ statistics, setStatistics ] = useState({});
  const [ latest, setLatest ] = useState([]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const modalsEvents = (name, value) => {
    dispatch({
      type: '@modal/open',
      payload: {name, value}
    });
  }

  const { loading, refetch, data } = useQuery(ALL_PROJECTS_QUERY, {
    variables: {
      filter: {
        sort: 'latest', completed: false
      },
      userId: user.id,
    },
  })

  useEffect(() => {
    let totalProjects = [];
    let completedProjects = [];
    let onlyCompletedProjects = [];

    refetch(ALL_PROJECTS_QUERY, {
      variables: {
        filter: {
          sort: 'latest', completed: false
        },
        userId: user._id,
      },
    });

    if (data) {
      setLatest(data.getAllProjects[0]);

      onlyCompletedProjects = data.getAllProjects.filter((project, index) => {
        totalProjects.push(index)
        return project.completed;
      });

      setCompleted(onlyCompletedProjects.map((project, index) => {
        completedProjects.push(index);
        return <CardCompleted key={project._id} name={project.name} />
      }))

    }

    setStatistics({
      "projects": totalProjects.length,
      "completed": onlyCompletedProjects.length,
      "percentage": Math.trunc((completedProjects.length * 100) / totalProjects.length),
    })
  }, [data, state])


  if (loading) return <Spinner />

  return (
    <section className={styles.section}>
      <div className={styles.tag}>
        <div>
          <span>
            <h4>{ statistics.projects }</h4>
            <h5>Projects</h5>
          </span>
          <i className='fal fa-clipboard-list'></i>
        </div>
        <div>
        <span>
            <h4>{ statistics.completed }</h4>
            <h5>Completed</h5>
          </span>
          <i className='fal fa-ballot-check'></i>
        </div>
        <div>
        <span>
            <h4>{ statistics.percentage ? statistics.percentage : 0 }%</h4>
            <h5>Percentage</h5>
          </span>
          <i className='fal fa-check-square'></i>
        </div>
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
        {
          latest
          ? <Cards name={latest.name}
          description={latest.description}
          id={latest._id}
          completed={latest.completed}
          createdAt={moment(latest.createdAt).format("YYYY/MM/DD")}
          modalsEvents={modalsEvents} />
          : <NoProjects />
        }
        
      </div>
    </section>
  );
}

export function CardCompleted({ name }) {
  return(
    <div className={styles.card}>
      <h3>{ name }</h3>
      <a href="/projects">See project</a>
    </div>
  );
}

export function NoProjects() {
  return(
    <div className={styles.noProjects}>
      <h6>No Projects</h6>
      <Link href='/projects'>
        <a>
          Create new Project
        </a>
      </Link>
    </div>
  );
}

export function LatestCard({ name, description, createdAt }) {
  return(
    <div className={styles.latestCard}>
      <h3>{name}</h3>
      <h4>{description}</h4>
      <h5>Create on: {createdAt}</h5>
    </div>
  );
}

export const getServerSideProps = async (context) => {

  const token = context.req.cookies['manager-app-projects-user-token'];
  const session = await getSession(context);
  
  let user = null;

  if (!session && !token) return {
    redirect: {
      destination: '/signin',
      permanent: false
    }
  }

  if (token) {
    user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }
  if (session) {
    user = {
      ...session.user,
      id: session.userId
    }
  }

  return {
    props: {user}
  }
}