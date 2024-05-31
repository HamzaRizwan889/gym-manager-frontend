// src/pages/sign-up.js
import Link from 'next/link';
import styles from '../../../styles/SignUp.module.css';

const SignUp = () => {
  return (
    <div className={styles.container}>
      <h1 className='text'>Sign Up</h1>
      <form>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit" className='text'>Sign Up</button>
      </form>
      <p>Already have an account? <Link href="/authentication/login">Sign In</Link></p>
      <p><Link href="/">Back to Home</Link></p>
    </div>
  );
};

export default SignUp;
