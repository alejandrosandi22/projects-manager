import { ChangeThemeContext, ThemeContext } from "pages/_app";
import { useContext, useEffect, useRef } from "react";
import useLocalStorage from "services/localStorage";
 

const Switch = () => {

  const theme = useContext(ThemeContext);
  const changeTheme = useContext(ChangeThemeContext);

  const [ checked, setChecked ] = useLocalStorage('cheked', false);
  const themeToggle = useRef(<input/>);
  
  useEffect(() => {
    if (checked) themeToggle.current.checked = true;
    else themeToggle.current.checked = false;
  }, []);
  
  return (
    <>
      <input ref={themeToggle} onChange={(e) => {
            setChecked(e.target.checked);
            changeTheme();
          }} type="checkbox" className={theme ? 'dark-mode' : 'light-mode'} />

      <style jsx>
      {`
        input {
          all: unset;
          border-radius: .5rem;
          display: flex;
          align-items: center;
          width: 4rem;
          height: 1.5rem;
          cursor: pointer;
          &::before{
            content: '\f185';
            font-family: "Font Awesome 5 Free";
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .5s;
          }
        }
        .light-mode {
          background: #e0e0e0;
          box-shadow: inset 4px 4px .1rem #5a5a5a,
          inset -4px -4px .1rem #ffffff;
          &::before{
            content: '\f186';
            background: #e0e0e0;
            box-shadow: inset 1px 1px 2px #5a5a5a,
            inset -1px -1px 2px #ffffff;
            transform: translateX(-10%);
            transition: .5s;
          }
        }
        .dark-mode {
          background: #141414;
          box-shadow: inset 4px 4px 1px #080808,
          inset -4px -4px 1px #202020;
          &::before{
            content: '\f185';
            color: #fff;
            background: #141414;
            box-shadow: inset 5px 5px 10px #080808,
            inset -5px -5px 10px #202020;
            transform: translateX(110%);
            transition: .5s;
          }
        }
      `}
      </style>
    </>
  );
}

export default Switch;
