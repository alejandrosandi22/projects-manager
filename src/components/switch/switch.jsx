import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "pages/_app";
import useLocalStorage from "services/localStorage";
import styles from 'styles/switch.module.scss';

const Switch = () => {

  const { changeTheme, theme} = useContext(ThemeContext);

  const [ mode, setMode ] = useState('lightMode');
  const themeToggle = useRef(<input/>);
  
  useEffect(() => {
    if (theme) {
      themeToggle.current.checked = true;
      setMode('darkMode');
    }
    else {
      themeToggle.current.checked = false;
      setMode('lightMode');
    }
  }, [theme]);
  
  return (
    <>
      <input className={`${styles.input} ${styles[mode]}`} ref={themeToggle} onChange={(e) => {
            changeTheme();
          }} type="checkbox"/>


    </>
  );
}

export default Switch;
