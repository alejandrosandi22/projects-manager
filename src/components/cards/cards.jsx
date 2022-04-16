import styles from 'styles/cards.module.scss';

export default function Cards() {
  return(
    <>
      <div className={styles.div}>
        <main className={styles.cardWrapper}>
          <h1><input type="checkbox" name="completed" id="completed" /> Project Name</h1>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repellat reiciendis similique eum mollitia.</h2>
          <span>
            <h3>Custom File 1:</h3>
            <h4>Custmo content 1</h4>
          </span>
        </main>
        <span>
          <button className={`fas fa-edit ${styles.edit}`}></button>
          <button className={`fas fa-trash ${styles.trash}`}></button>
        </span>
      </div>
    </>
  );
}