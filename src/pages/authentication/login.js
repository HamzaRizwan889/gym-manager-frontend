import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations/mutation.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Login.module.css';
import { login as storeToken, getUserId } from '../../../services/authService.js'; 

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

      if (data && data.Login && data.Login.token) {
        storeToken(data.Login.token);
        router.push('/authentication/welcome');
      }
    } catch (error) {
      console.error(error); 
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign In</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-div">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            {...register('email', { required: true })}
          />
          {errors.email && <span>Email is required</span>}
        </div>
        <div className="form-div">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            {...register('password', { required: true })}
          />
          {errors.password && <span>Password is required</span>}
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit" disabled={loading}>Sign In</button>
      </form>
      <p className={styles.linkText}>Don't have an account? <Link href="/authentication/signup"><span className={styles.link}>Sign Up</span></Link></p>
      <p className={styles.linkText}><Link href="/"><span className={styles.link}>Back to Home</span></Link></p>
    </div>
  );
};

export default SignIn;
