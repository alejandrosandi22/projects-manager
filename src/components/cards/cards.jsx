import { useEffect, useRef } from 'react';
import styles from 'styles/cards.module.scss';

export default function Cards(props) {
  const checkbox = useRef(<input/>);

  useEffect(() => {
    checkbox.current.checked = true
  }, [])
    return(
      <>
      <div className={styles.card}>
        <div className={styles['card-wrapper']}>
          <h1><input ref={checkbox}
          type="checkbox"
          name="completed"
          id="completed" /> {props.name} <em>Created on: {props.createdAt} <br/>Last update: {props.updatedAt}</em></h1>
          <h2>{props.description}</h2>
          {
            props.customFields.map((field, index) => {
              if (!field) return;
              return(
                <span key={index + 50}>
                  <h3>{field.name}:</h3>
                  <h4>{field.content}</h4>
                </span>
              );
            })
          }
        </div>
        <span>
          <button className={`fas fa-edit ${styles.edit}`}></button>
          <button onClick={() => props.showDeleteProjectModal(props.id, props.name)} className={`fas fa-trash ${styles.trash}`}></button>
        </span>
      </div>
    </>
  );
}