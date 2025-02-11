import { useEffect, useState } from 'react';
import styles from './RepositoriesItem.module.scss';

export const RepositoriesItem = ({ repo }) => {
  console.log('---------');
  console.log(repo);
  const [languages, setLanguages] = useState(null);
  const lang = {
    "JavaScript": 8279,
    "SCSS": 2605,
    "HTML": 2038
  };


  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`
        );
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, [repo.name, repo.owner.login]);

  console.log(lang);

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
        
      </div>
    </div>
  );
};