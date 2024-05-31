import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations/mutation.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/Login.module.css';
import { login as storeToken } from '../../../services/authService.js'; 
import NavBar from '../../components/navbar.js';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginMutation, { loading, error, data }] = useMutation(LOGIN);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (formData) => {
    try {
      const { data } = await loginMutation({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (data && data.Login && data.Login.token && data.Login.user._id) {
        storeToken(data.Login.token, data.Login.user._id);
        router.push('/admin/admin');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error(error); 
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <NavBar/>
      <div className={styles.container}>
        <h1 className={styles.heading}>Sign In</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="text"
              className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
              {...register('email', { 
                required: 'Email is required', 
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className={styles.linkText}>Don't have an account? <Link href="/authentication/signup"><span className={styles.link}>Sign Up</span></Link></p>
        <p className={styles.linkText}><Link href="/"><span className={styles.link}>Back to Home</span></Link></p>
      </div>
    </>
  );
};

export default SignIn;
