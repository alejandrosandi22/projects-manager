import Link from "next/link";
import { useEffect, useState } from "react";
import { colors } from "styles/styles";
import { useRouter } from 'next/router';


const Nav = () => {

  const [selected, setSelected] = useState('0');
  const router = useRouter();

  const handleClick = (e) => {
    const { id } = e.target;
    setSelected(id);
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
      <nav>
        <Link href="/dashboard">
          <a>
            <li id="0" onClick={handleClick} className={`${selected === '0' && 'active'}`}>
              <i className="fal fa-tachometer"></i>
              <span>Dashboard</span>
            </li>
          </a>
        </Link>
        <Link href="/projects">
          <a>
            <li id="1" onClick={handleClick} className={`${selected === '1' && 'active'}`}>
              <i className="fal fa-clipboard-list"></i>
              <span>Projects</span>
            </li>
          </a>
        </Link>
        <Link href="/completed">
          <a>
            <li id="2" onClick={handleClick} className={`${selected === '2' && 'active'}`}>
              <i className="fal fa-check-square"></i>
              <span>Completed</span>
            </li>
          </a>
        </Link>
        <Link href="/completed">
          <a>
            <li id="3" onClick={handleClick} className={`${selected === '3' && 'active'}`}>
              <i className="fal fa-question"></i>
              <span>Help</span>
            </li>
          </a>
        </Link>
        <a>
          <li id="4" onClick={handleClick} className={`${selected === '4' && 'active'}`}>
            <i className="fal fa-sign-out"></i>
            <span>Sign Out</span>
          </li>
        </a>
      </nav>

      <style jsx>
      {`
        nav {
          z-index: 100;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto 0;
          width: 5rem;
          height: 80%;
          background: ${colors.primary};
          border-radius: 0 2rem 2rem 0;
          box-shadow: .2rem .2rem .5rem ${colors.darkShadow},
          -.2rem -.2rem .5rem ${colors.lightShadow};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          overflow: hidden;
          transition: .5s;
          &:hover {
          width: 15rem;
          transition: .5s;
          }
          a {
            width: 100%;
            height: 15%;
            li {
              display: flex;
              align-items: center;
              color: ${colors.color};
              cursor: pointer;
              font-size: 1.25rem;
              width: 100%;
              height: 100%;
              transition: .25s;
              &:hover {
                opacity: .7;
              }
              i {
                position: absolute;
                left: 1.8rem;
                pointer-events:none;
              }
              span {
                position: absolute;
                left: 6rem;
                width: max-content;
                pointer-events:none;
              }
            }
            .active {
              background: ${colors.secondary};
              box-shadow: 0 2px 5px ${colors.darkShadow};
              &:hover {
                opacity: 1;
              }
              i, span {
                color: #E0E0E0;
              }
            }
          }
        }  
      `}
      </style>
    </>
  );
}

export default Nav;
