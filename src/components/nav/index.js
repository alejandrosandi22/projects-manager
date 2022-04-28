import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useSelector } from 'react-redux';
import { removeCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import styles from 'styles/nav.module.scss';
import Switch from '../switch';
import Link from 'next/link';

export default function Nav() {
  const client = useApolloClient();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state);
  const [selected, setSelected] = useState('0');
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  console.log(user)

  const hanldeToggle = () => {
    setToggle(!toggle);
  }

  const handleClick = (e) => {
    const { id } = e.target;
    hanldeToggle();
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
      <nav className={styles.nav}>
        <ul className={styles.logo}>
          <li>
            <i className="fas fa-clipboard-list" />
            <h1>Manager</h1>
          </li>
        </ul>
      {
        window.innerWidth > 1024 && <ul className={styles.ul}>
          <li>{ user && user.name }</li>
          <li><img onError={({ currentTarget }) => currentTarget.src = '/default-user.png'} src={user ? user.image : '/default-user.png'} alt="user" /></li>
        </ul>
      }
      {
        window.innerWidth <= 1024 && <div onClick={() => hanldeToggle()} className={styles.toggleWrapper}>
          <div className={`${styles.toggle} ${toggle && styles.active}`} onClick={() => setToggle(!toggle)} />
        </div>
      }
      </nav>
      <nav className={`${styles.sidebar} ${!toggle ? styles.hidde : ''}`}>
        <ul>
          <Link href="/dashboard">
            <a id="0" onClick={handleClick}>
              <li id="0" onClick={handleClick} className={`${styles.li} ${selected === '0' ? styles.active : ''}`}>
                <i className="fal fa-tachometer" />
                <span>Dashboard</span>
              </li>
            </a>
          </Link>
          <Link href="/projects">
            <a id="1" onClick={handleClick}>
              <li id="1" onClick={handleClick} className={`${styles.li} ${selected === '1' ? styles.active : ''}`}>
                <i className="fal fa-clipboard-list" />
                <span>Projects</span>
              </li>
            </a>
          </Link>
          <li onClick={() => handleSignOut()} className={styles.li}>
            <i className="fal fa-sign-out" />
            <span>Sign Out</span>
          </li>
          { 
            window.innerWidth <= 1024 && <li className={styles.li}>
              <img onError={({ currentTarget }) => currentTarget.src = '/default-user.png'} src={user ? user.image : '/default-user.png'} alt="user" />
              <span>{ user && user.name }</span>
            </li>
          }
        </ul>
        <div className={styles.switchWrapper}>
          <Switch />
        </div>
      </nav>
    </>
  );
}
