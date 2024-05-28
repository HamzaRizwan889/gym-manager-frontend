// src/pages/Home.js
import React, { useState } from 'react';
import NavBar from '../components/navbar';
import Loader from '../components/loader'; // Import the Loader component
import styles from './styles/Home.module.css';

const Home = () => {
  const [loading, setLoading] = useState(false); // State to manage loading status

  // Simulating loading by setting loading to true for 2 seconds
  const handleFetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.backgroundImage} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <h1 className={styles.text}>Welcome to Gym Manager</h1>
          <p className={styles.subText}>Your ultimate solution for gym management</p>
          <div className={styles.buttonContainer}>
            <a href="/authentication/signup" className={styles.button}>Get Started</a>
            <a href="/authentication/login" className={styles.button}>Login</a>
          </div>
        </div>
        {loading && <Loader />} {/* Conditionally render the loader */}
        <div className={styles.callToAction}>
          <h2>Why Choose Us?</h2>
          <div className={styles.features}>
            {/* Feature icons go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
