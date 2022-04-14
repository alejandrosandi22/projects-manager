import Link from 'next/link';
import { useEffect, useState } from 'react';
 
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { removeCookies } from 'cookies-next';

import styles from 'styles/nav.module.scss';

const Nav = () => {
  const [selected, setSelected] = useState('0');
  const router = useRouter();


  const handleClick = (e) => {
    const { id } = e.target;
    setSelected(id);
  }

  const handleSignOut = () => {
    removeCookies('manager-app-projects-user-token');
    signOut();
  }

  useEffect(() => {
    const { pathname } = router;
    if (pathname === '/dashboard') setSelected('0');
    if (pathname === '/projects') setSelected('1');
    if (pathname === '/completed') setSelected('2');
    if (pathname === '/help') setSelected('3');
  }, []);

  return (
    <>
      <nav className={`${styles.nav}`}>
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
        <a>
          <li id="4" onClick={(e) => {
            handleSignOut();
            handleClick(e);
          }} className={`${selected === '4' && styles['active']}}`}>
            <i className="fal fa-sign-out"></i>
            <span>Sign Out</span>
          </li>
        </a>
      </nav>


    </>
  );
}

export default Nav;
