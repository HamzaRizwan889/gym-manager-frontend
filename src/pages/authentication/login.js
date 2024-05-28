import Link from 'next/link';
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';
import { USERS_QUERY, USER_QUERY } from '../../graphql/queries/query';

const SignIn = () => {
    const [usersFetch, { loading: usersLoading, data: usersData, error: usersError }] = useLazyQuery(USERS_QUERY);
    const [userFetch, { loading: userLoading, data: userData, error: userError }] = useLazyQuery(USER_QUERY);
    const [user, setUser] = useState();

    useEffect(()  => {
        handleUsersFetch();
        handleUserFetch();
    }, [])

    const handleUsersFetch = async () => {
        try {
          await usersFetch();
        } catch (usersError) {
          console.error(usersError);
        }
      };

      const handleUserFetch = async () => {
        try {
          await userFetch();
        } catch (userError) {
          console.error(userError);
        }
      };

      const loginForm = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
      
        const handleSubmit = (event) => {
          event.preventDefault(); 
      
          const formData = {
            email: email,
            password: password,
          };
      
          console.log('Form data:', formData);
      
          setEmail('');
          setPassword('');
        };
      
        return (
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-div">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-div">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
        );
      };

      useEffect(() => {
        if (usersData) {
          console.log(usersData.Users);
        }
        if (usersError) {
          console.error(usersError);
        }
      }, [usersData, usersError]);
    
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign In</h1>
      {loginForm()} 
      <p className={styles.linkText}>Don't have an account? <Link href="/authentication/signup"><span className={styles.link}>Sign Up</span></Link></p>
      <p className={styles.linkText}><Link href="/"><span className={styles.link}>Back to Home</span></Link></p>
      <button onClick={handleUsersFetch} className={styles.fetchButton}>Fetch Users</button>
    </div>
  );
};

export default SignIn;
