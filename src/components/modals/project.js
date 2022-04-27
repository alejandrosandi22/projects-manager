import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from 'styles/modals/project.module.scss';

export default function Project() {

  const { data } = useSelector((state) => state.modals.project);
  const [ hidde, setHidde] = useState(false);


  const closeModal = () => {
    setHidde(true);
    setTimeout(() => {
      setHidde(false);
      data.modalsEvents('project', {status: false});
    }, 300);
  }

  return(
    <section className={`${styles.section} ${hidde ? 'hidde' : ''}`}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>{data.name}</h1>
          <i onClick={() => closeModal()} className='fal fa-times'></i>
        </div>
        <div className={styles.description}>
          <p>{data.description}</p>
        </div>
        <div className={styles.options}>
          <div className={styles.customFields}>
            {
              data.customFields && data.customFields.map((field, index) => {
                return(
                  <span key={index}>
                    <h3>{ field.name }:</h3>
                    <h3>{ field.content }</h3>
                  </span>
                )
              })
            }
          </div>
          <span className={styles.span}>
            <h4>Created on: { data.createdAt }</h4>
            <h4>Last update: { data.updatedAt }</h4>
          </span>
        </div>
      </div>
    </section>
  );
}