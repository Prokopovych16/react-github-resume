import { Link } from 'react-router-dom';
import styles from './NoUser.module.scss'

export const NoUser = () => {
  return (
    <div className={styles.container}>
      <p className={styles.container__text}>Unfortunately there is no such user on the server</p>
      <Link to="/" className={styles.container__button}>Go Back</Link>
    </div>
  );
}