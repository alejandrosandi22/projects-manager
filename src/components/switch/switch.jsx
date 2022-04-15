import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from "../../../store/actions";

import styles from 'styles/switch.module.scss';

export default function Switch() {

  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();

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
      <input className={`${styles.input} ${styles[mode]}`} ref={themeToggle}
      onChange={() => actions(dispatch, '@theme/mode', (theme ? false : true))}
      type="checkbox"/>
    </>
  );
}
