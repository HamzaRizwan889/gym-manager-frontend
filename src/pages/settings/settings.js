import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styles from '../styles/Settings.module.css';
import NavBar from '../../components/navbar.js';

const Settings = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = (formData) => {
    console.log('Settings updated:', formData);
    setSuccessMessage('Settings updated successfully.');
  };

  return (
    <div>
    <NavBar/>
    <div className={styles.container}>
      <h1 className={styles.heading}>Settings</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="setting1" className={styles.label}>Setting 1</label>
          <input
            id="setting1"
            type="text"
            className={`${styles.input} ${errors.setting1 ? styles.errorInput : ''}`}
            {...register('setting1', { required: true })}
          />
          {errors.setting1 && <span className={styles.errorText}>Setting 1 is required</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="setting2" className={styles.label}>Setting 2</label>
          <input
            id="setting2"
            type="text"
            className={`${styles.input} ${errors.setting2 ? styles.errorInput : ''}`}
            {...register('setting2', { required: true })}
          />
          {errors.setting2 && <span className={styles.errorText}>Setting 2 is required</span>}
        </div>
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        <button type="submit" className={styles.button}>Update Settings</button>
      </form>
    </div>
    </div>
  );
};

export default Settings;
