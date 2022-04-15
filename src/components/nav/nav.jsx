import Link from 'next/link';
import { useEffect, useState } from 'react';
 
import { useRouter } from 'next/router';
import { getSession, signOut } from 'next-auth/react';
import { removeCookies } from 'cookies-next';

import styles from 'styles/nav.module.scss';

export default function Nav() {
  const [ selected, setSelected ] = useState('0');
  const [ toggle, setToggle ] = useState(false);
  const router = useRouter();

  const handleClick = (e) => {
    const { id } = e.target;
    if (window.innerWidth <= 1024) setToggle(!toggle);
    setSelected(id);
  }

  const handleSignOut = () => {
    removeCookies('manager-app-projects-user-token');
    signOut();
    router.push('/signin');
  }

  useEffect(() => {
    const { pathname } = router;
    if (pathname === '/dashboard') setSelected('0');
    if (pathname === '/projects') setSelected('1');
    if (pathname === '/completed') setSelected('2');
    if (pathname === '/help') setSelected('3');
    if (pathname === '/profile') setSelected('4');
  }, []);

  return (
    <>
    <div className={styles.div}>
      <div className={`${styles.toggle} ${toggle && styles.active}`} onClick={() => setToggle(!toggle)} ></div>
    </div>
      <nav className={`${styles.nav} ${!toggle && styles.hidden}`}>
        <Link href="/dashboard">
          <a>
            <li id="0" onClick={handleClick} className={`${selected === '0' && styles['active']}`}>
              <i className="fal fa-tachometer"></i>
              <span>Dashboard</span>
            </li>
          </a>
        </Link>
        <Link href="/projects">
          <a>
            <li id="1" onClick={handleClick} className={`${selected === '1' && styles['active']}`}>
              <i className="fal fa-clipboard-list"></i>
              <span>Projects</span>
            </li>
          </a>
        </Link>
        <Link href="/completed">
          <a>
            <li id="2" onClick={handleClick} className={`${selected === '2' && styles['active']}`}>
              <i className="fal fa-check-square"></i>
              <span>Completed</span>
            </li>
          </a>
        </Link>
        <Link href="/completed">
          <a>
            <li id="3" onClick={handleClick} className={`${selected === '3' && styles['active']}`}>
              <i className="fal fa-question"></i>
              <span>Help</span>
            </li>
          </a>
        </Link>
        <Link href="/profile">
          <a>
            <li id="4" onClick={handleClick} className={`${selected === '4' && styles['active']}`}>
              <i className='fal fa-user'></i>
              <span>Profile</span>
            </li>
          </a>
        </Link>
        <a>
          <li id="5" onClick={(e) => {
            handleSignOut();
            handleClick(e);
          }} className={`${selected === '5' && styles['active']}}`}>
            <i className="fal fa-sign-out"></i>
            <span>Sign Out</span>
          </li>
        </a>
      </nav>
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