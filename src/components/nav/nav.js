import { removeCookies } from 'cookies-next';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import Link from 'next/link';
import Switch from '../switch/switch';
import styles from 'styles/nav.module.scss';

export default function Nav(props) {

  const user = useSelector((state) => state.user);
  const state  = useSelector((state) => state)
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
  }, [state]);

  return(
    <>
    <div className={styles.div}>
      <div className={`${styles.toggle} ${toggle && styles.active}`} onClick={() => setToggle(!toggle)} ></div>
    </div>
      <nav className={styles.nav}>
        <ul>
          <li>{ user && user.name }<i className='fal fa-angle-down'></i></li>
          <li><img onError={({currentTarget}) => currentTarget.src = '/default-user.png'} src={user ? user.image : '/default-user.png'} alt='user' /></li>
        </ul>
      </nav>
      <nav className={styles.sidebar}>
        <ul>
          <li className={styles.logo}><i className='fas fa-clipboard-list'></i><h1>Manager</h1></li>
          <Link href='/dashboard' >
            <a>
            <li id='0' onClick={handleClick} className={`${styles.li} ${selected === '0' && styles.active}`}>
              <i className='fal fa-tachometer'></i>
              <span>Dashboard</span>  
            </li>
            </a>
          </Link>
          <Link href='/projects'>
            <a>
              <li id='1' onClick={handleClick} className={`${styles.li} ${selected === '1' && styles.active}`}>
                <i className="fal fa-clipboard-list"></i>
                <span>Projects</span>
              </li>
            </a>
          </Link>
          <Link href='https://manager-app.ml'>
            <a target='_blank'>
            <li className={styles.li}>
              <i className='fal fa-plus-circle'></i>
              <span>More</span>  
            </li>
            </a>
          </Link>
        </ul>
      </nav>
      <div className={styles.switchWrapper}>
          <Switch />
      </div>
    </>
  );
}
