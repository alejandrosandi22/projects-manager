import css from "styled-jsx/css";
import { colors } from "./styles";

const globals = css.global`
  :root {
    font-size: 1vw;
    @media (max-width: 1024px) {
      font-size: 1.8vh;
    }
    @media (max-height: 500px) {
      font-size: 2vw;
    }

  }

  html,
  body {
    background: ${colors.primary};
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

export default globals;