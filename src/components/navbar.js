import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../pages/styles/NavBar.module.css';
import { getAuthToken } from '../../services/authService'; // Import the auth service to get the auth token
import { logout } from '../../services/authService';

const NavBar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  useEffect(() => {
    const token = getAuthToken();
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/'); 
  };


  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/admin/admin">Admin Control Center</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/settings/settings">Settings</Link>
        </li>
        <li className={styles.navItem}>
          {isLoggedIn ? (
            <a className={styles.navButton} onClick={handleLogout}>Logout</a>
          ) : (
            <Link href="/authentication/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
