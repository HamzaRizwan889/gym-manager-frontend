import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar.js';
import Loader from '../components/loader';
import styles from '../../styles/Home.module.css';
import { getAuthToken } from '../../services/authService'; 
import { logout } from '../../services/authService';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const token = getAuthToken();
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/admin/admin'); 
  };

  return (
    <div className={styles.backgroundContainer}>
      <div />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <h1 className={styles.text}>Welcome to Gym Manager</h1>
          <p className={styles.subText}>Your ultimate solution for gym management</p>
          <div className={styles.buttonContainer}>
            {isLoggedIn && (
              <>
              <a href="/admin/admin" className={styles.button}>Admin Control Panel</a>
              <button onClick={handleLogout} className={styles.button}>Logout</button>
              </>
            )}
             {!isLoggedIn && (
              <a href="/authentication/login" className={styles.button}>Login</a>
            )}
          </div>
        </div>
        {loading && <Loader />}
        <div className={styles.callToAction}>
        </div>
      </div>
    </div>
  );
};

export default Home;
