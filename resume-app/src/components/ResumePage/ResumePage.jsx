import React, { useEffect, useState } from "react";
import styles from './ResumePage.module.scss';
import { Octokit } from "octokit";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { NoUser } from "../NoUser/NoUser";
import { RepositoriesList } from "../RepositoriesList/RepositoriesList";

const octokit = new Octokit();

export const ResumePage = () => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [reposInfo, setReposInfo] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);


  async function getUserData(usern) {
    try {
      setIsLoaded(false); 
      setIsError(false);
      const user = await octokit.request(`GET /users/${usern}`);
      const repos = await octokit.request(`GET /users/${usern}/repos`, {
        sort: "updated",
        per_page: 10,
      });
  
      setUserInfo(user.data);
      setReposInfo(repos.data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    getUserData(username);
  }, [username]);
  
  if (!isLoaded) {
    return <div><Loader /></div>;
  }

  if (isError || !userInfo) {
    return <NoUser />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.container__topLine}></div>
      <div className={styles.container__wrapper}>
        <div className={styles.leftSide}>
          <div className={styles.leftSide__logo}>
            <img src={userInfo.avatar_url} alt="" />
          </div>
          <div className={styles.leftSide__title}>
            <h1 className={styles.leftSide__title_name}>{userInfo.name}</h1>
            <p className={styles.leftSide__title_login}>{userInfo.login}</p>
          </div>
          <div className={styles.leftSide__mainInfo}>
            <p className={styles.leftSide__mainInfo_repositiories}>
              <span className={styles.leftSide__mainInfo_repositiories_number}>
                {userInfo.public_repos}
              </span>
              <span>repositories</span>
            </p>
            <div className={styles.leftSide__mainInfo_repositiories__created}>
              <h3 className={styles.leftSide__mainInfo_repositiories__created_title}>
                Registered on: 
              </h3>
              <p>{new Date(userInfo.created_at).toLocaleString()}</p>
            </div>
            <div></div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSide__title}>
            <h2 className={styles.rightSide__title_text}>Popular repositories</h2>
          </div>
          <RepositoriesList reposInfo={reposInfo} />
        </div>
      </div>
    </div>
  );
}