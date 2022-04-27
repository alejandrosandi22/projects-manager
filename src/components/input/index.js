import styles from 'styles/input.module.scss';

export default function Input(props) {
  return (
    <div className={styles.div}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        required={props.required}
        onChange={props.onChange}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        id={props.id}
        ref={props.reference}
      />
    </div>
  );
}
