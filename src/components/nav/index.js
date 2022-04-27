import { removeCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styles from 'styles/nav.module.scss';
import { useApolloClient } from '@apollo/client';
import Switch from '../switch';

export default function Nav() {
  const client = useApolloClient();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state);
  const [selected, setSelected] = useState('0');
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const handleClick = (e) => {
    const { id } = e.target;
    if (window.innerWidth <= 1024) setToggle(!toggle);
    setSelected(id);
  };

  const handleSignOut = () => {
    removeCookies('manager-app-projects-user-token');
    client.clearStore();
    router.push('/signin');
  };

  useEffect(() => {
    const { pathname } = router;
    if (pathname === '/dashboard') setSelected('0');
    if (pathname === '/projects') setSelected('1');
  }, [state]);

  return (
    <>
      <div className={styles.div}>
        <div className={`${styles.toggle} ${toggle && styles.active}`} onClick={() => setToggle(!toggle)} />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>{ user && user.name }</li>
          <li><img onError={({ currentTarget }) => currentTarget.src = '/default-user.png'} src={user ? user.image : '/default-user.png'} alt="user" /></li>
        </ul>
      </nav>
      <nav className={styles.sidebar}>
        <ul>
          <li className={styles.logo}>
            <i className="fas fa-clipboard-list" />
            <h1>Manager</h1>
          </li>
          <Link href="/dashboard">
            <a>
              <li id="0" onClick={handleClick} className={`${styles.li} ${selected === '0' && styles.active}`}>
                <i className="fal fa-tachometer" />
                <span>Dashboard</span>
              </li>
            </a>
          </Link>
          <Link href="/projects">
            <a>
              <li id="1" onClick={handleClick} className={`${styles.li} ${selected === '1' && styles.active}`}>
                <i className="fal fa-clipboard-list" />
                <span>Projects</span>
              </li>
            </a>
          </Link>
          <li onClick={() => handleSignOut()} className={styles.li}>
            <i className="fal fa-sign-out" />
            <span>Sign Out</span>
          </li>
        </ul>
      </nav>
      <div className={styles.switchWrapper}>
        <Switch />
      </div>
    </>
  );
}
