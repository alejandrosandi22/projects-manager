import css from "styled-jsx/css";
import { colors } from "./styles";

export const signUpStyle = css`
  .switch-wrapper {
    z-index: 100;
    position: absolute;
    top: 2rem;
    right: 3rem;
  }
  section {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 30rem;
    height: 40rem;
    background: ${colors.primary};
    box-shadow: .2rem .2rem .5rem ${colors.darkShadow},
    -.2rem -.2rem .5rem ${colors.lightShadow};
    h2 {
      text-transform: uppercase;
      font-size: 2rem;
      text-align: center;
      color: ${colors.color};
    }
    form {
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      div {
        display: flex;
        width: 100%;
      }
      .email-wrapper {
        width: 112%;
      }
      span {
        width: 70%;
        display: flex;
        justify-content: space-evenly;
      }
      button {
        border: none;
        background: ${colors.primary};
        color: ${colors.color};
        box-shadow: .15rem .15rem .5rem ${colors.darkShadow},
        -.15rem -.15rem .5rem ${colors.lightShadow};
        font-size: 1.1rem;
        width: 7rem;
        height: 2.3rem;
        justify-self: center;
        align-self: center;
        cursor: pointer;
        &:hover {
          filter: brightness(105%);
        }
        &:active {
          box-shadow: inset .15rem .15rem .5rem ${colors.darkShadow},
          inset -.15rem -.15rem .5rem ${colors.lightShadow};
        }
      }
    }
    a {
      color: ${colors.color};
      opacity: .7;
      &:hover {
        opacity: 1;
      }
    }
    div {
      width: 60%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  }

  @media (max-width: 1024px) {
    section {
      width: 100%;
      min-height: 100%;
      form {
        grid-template-columns: 50 50%;
        grid-template-rows: 70% 30%;
      }
    }
  }
  @media (max-height: 500px) {
    section {
      height: 500px;
    }
  }
`