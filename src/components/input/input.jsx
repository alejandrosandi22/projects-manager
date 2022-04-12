import styles from 'styles/input.module.scss';

const Input = (props) => {
  
  return (
    <>
    <div className={styles.div}>
      <label htmlFor={props.id}>{props.label}</label>
      <input required={props.required} ref={props.ref} onChange={props.onChange} type={props.type} id={props.id} />
    </div>
    </>
  );
}

export default Input;
