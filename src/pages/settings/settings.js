import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_MEMBERSHIP } from '../../graphql/mutations/mutation.js';
import { MEMBERSHIPS_QUERY } from '../../graphql/queries/query.js';
import styles from '../../../styles/Settings.module.css';
import NavBar from '../../components/navbar.js';
const { Modal, Button } = require('antd') ;

const Settings = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm(); // Add setValue from useForm
  const { loading, error, data, refetch } = useQuery(MEMBERSHIPS_QUERY);
  const [updateMembership] = useMutation(UPDATE_MEMBERSHIP);
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);

  const showModal = (membership) => {
    setSelectedMembership(membership);
    setIsModalVisible(true);
    // Set initial values of the form fields when the modal is opened
    setValue('name', membership.name);
    setValue('price', membership.price);
  };

  const handleOk = async (formData) => {
    try {
      await updateMembership({
        variables: {
          updateMembershipId: selectedMembership._id,
          input: formData
        }
      });
      setSuccessMessage('Membership updated successfully.');
      setIsModalVisible(false);
      refetch();
      reset();
    } catch (error) {
      console.error('Error updating membership:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (formData) => {
    console.log('Settings updated:', formData);
    setSuccessMessage('Settings updated successfully.');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Settings</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.Memberships.map(membership => (
              <tr key={membership._id}>
                <td>{membership.name}</td>
                <td>{membership.price}</td>
                <td>
                  <Button onClick={() => showModal(membership)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal title="Edit Membership" visible={isModalVisible} onOk={handleSubmit(handleOk)} onCancel={handleCancel}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input
                id="name"
                type="text"
                className={`${styles.input} ${errors.name ? styles.errorInput : ''}`}
                {...register('name', { required: true })}
              />
              {errors.name && <span className={styles.errorText}>Name is required</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>Price</label>
              <input
                id="price"
                type="number"
                step="0.01"
                className={`${styles.input} ${errors.price ? styles.errorInput : ''}`}
                {...register('price', { required: true })}
              />
              {errors.price && <span className={styles.errorText}>Price is required</span>}
            </div>
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Settings;
