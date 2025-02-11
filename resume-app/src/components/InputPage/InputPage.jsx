import React, { useState } from "react";
import styles from './InputPage.module.scss';
import { useNavigate } from "react-router-dom";

export const InputPage = () => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleGenerateButtonPress = () => {
    const trimmedUsername = userId.trim();

    if (trimmedUsername) {
      navigate(`/${trimmedUsername}`);

      setUserId("");
    } else {
      setError("Field can not be empty!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGenerateButtonPress();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__wrapper}>
        <div className={styles.text}>
          <h1 className={styles.text__title}>Github CV generator</h1>
          <p className={styles.text__description}>To generate a detailed CV based on all the public data available on your profile, just enter your GitHub username </p>
        </div>
        <div className={styles.input}>
          <input 
            className={styles.input__area} 
            type="text" 
            placeholder='Enter Github Username' 
            value={userId}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <button 
            className={styles.input__button}
            onClick={handleGenerateButtonPress}
          >
            Generate
          </button>
          <p className={styles.input__error}>{error}</p>
          </div>
      </div>
    </div>
  );
}