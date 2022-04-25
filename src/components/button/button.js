import styles from 'styles/button.module.scss';

export default function Button(props) {
  return(
    <button className={`${props.className} ${styles.button}`}
    onClick={props.onClick}
    type={props.type}>{props.caption}</button>
  );
}