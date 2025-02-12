import styles from './PageNotFound.module.scss';

export const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <h1>Page not found</h1>
      <p>Try one more time</p>
    </div>
  );
}