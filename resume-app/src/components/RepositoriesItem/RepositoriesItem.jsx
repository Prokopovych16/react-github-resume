import { useEffect, useState } from 'react';
import styles from './RepositoriesItem.module.scss';
import LanguagesChart from '../LanguagesChart/LanguagesChart';
import { Octokit } from 'octokit';
import { Loader } from '../Loader/Loader';

export const RepositoriesItem = ({ repo }) => {
  const octokit = new Octokit();
  const [languages, setLanguages] = useState(null);

  const fetchLanguages = async (login, name) => {
    try {
      const user = await octokit.request(`GET /repos/${login}/${name}/languages`);
      setLanguages(user.data);
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  useEffect(() => {

    fetchLanguages(repo.owner.login, repo.name);
  }, [repo.name, repo.owner.login]);

  return (
    <div className={styles.container}>
      <h3 className={styles.container__title}>{repo.name}</h3>
      <p className={styles.container__mainText}>
        <span className={styles.container__mainText_text}>
          To get more information about the repositoriy, you should
        </span>{' '}
        <span className={styles.container__mainText_link}> 
          <a href={repo.svn_url} target="_blank" rel="noreferrer" >
             click 
          </a> 
        </span>{' '}
        <span className={styles.container__mainText_text}>
          on this link
        </span>
      </p>
      <div className={styles.container__graphic}>
        <div>
        {languages ? (
          <LanguagesChart languages={languages} />
        ) : (
          <Loader />
        )}
      </div>
      </div>
    </div>
  );
};