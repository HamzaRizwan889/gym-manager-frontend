import Link from 'next/link';
import styles from "../pages/styles/Login.module.css"

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/authentication/login" className={styles.text}>Login</Link></li>
        <li><Link href="/authentication/signup" className={styles.text}>Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
