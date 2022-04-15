import styles from 'styles/profile.module.scss';
import { useSelector } from 'react-redux';

export default function Profile() {

  const user = useSelector(state => state)

  return (
    <>
      <section className={styles.section}>
        <span>
          <img onError={({ currentTarget }) => currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} src={user.image} alt="photoURL" />
          <h2>{ user.name }</h2>
        </span>
        <div>
          
        </div>
      </section>
    </>
  );
}
