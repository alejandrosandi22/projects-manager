import { colors } from "styles/styles";

const Input = (props) => {
  return (
    <>
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input type={props.type} id={props.id} />
    </div>

      <style jsx>
      {`
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 4rem;
        input, label {
          width: 80%;
        }
        label {
          color: ${colors.color};
          font-size: 1.1rem;
        }
        input {
          color: ${colors.color};
          font-size: 1rem;
          border: none;
          height: 2rem;
          padding: 0 1rem;
          background: ${colors.primary};
          box-shadow: inset .15rem .15rem .5rem ${colors.darkShadow},
          inset -.15rem -.15rem .5rem ${colors.lightShadow};
          &:focus-visible {
            outline: 1px solid ${colors.secondary};
          }
        }
      }
      `}
      </style>
    </>
  );
}

export default Input;
