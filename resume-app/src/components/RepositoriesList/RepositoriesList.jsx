import { RepositoriesItem } from '../RepositoriesItem/RepositoriesItem';
import styles from './RepositoriesList.module.scss';

export const RepositoriesList = ({ reposInfo }) => {
  return (
    <div className={styles.listContainer}>
      {reposInfo.map(repo => {
        return <RepositoriesItem key={repo.id} repo={repo} />;
      })}
    </div>
  );
}