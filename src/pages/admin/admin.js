import React, { useEffect, useState } from 'react';
const { useRouter } = require('next/router');
const Link = require('next/link');
const { getAuthToken, getUserId, logout } = require('../../../services/authService');
const { useQuery, useMutation } = require('@apollo/client');
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../graphql/mutations/mutation';
import { USERS_QUERY, ROLES_QUERY, MEMBERSHIPS_QUERY } from '../../graphql/queries/query';
import NavBar from '../../components/navbar.js';
const { Table, Button, Modal, Form, Input, message , Select} = require('antd');
import styles from "../../../styles/Admin.module.css";
import moment from 'moment';

const Admin = () => {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    dateOfBirth: moment().format('YYYY-MM-DD'),
    roleId: '',
    membershipId: '',
  });
  
  const { data, loading, error, refetch } = useQuery(USERS_QUERY);
  const { data: rolesData, loading: rolesLoading, error: rolesError, refetch: rolesRefetch } = useQuery(ROLES_QUERY);
  const { data: membershipsData, loading: membershipsLoading, error: membershipsError, refetch: membershipRefetch } = useQuery(MEMBERSHIPS_QUERY);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [loggedInUserId, setLoggedInUserId] = useState();

  useEffect(() => {
    const token = getAuthToken();
    const userId = getUserId();
    if (!token || !userId) {
      router.push('/');
    } else {
      setLoggedInUserId(userId);
    }
  }, [router]);

  useEffect(() => {
    if (!isModalVisible) {
      resetFormData();
    }
  }, [isModalVisible]);

  const resetFormData = () => {
    setFormData({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      dateOfBirth: moment().format('YYYY-MM-DD'),
      roleId: '',
      membershipId: '',
    });
  };

  useEffect(() => {
    if (!isModalVisible) {
      resetFormData();
    }
  }, [isModalVisible]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const showCreateModal = () => {
    resetFormData();
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const showEditModal = (user) => {
    setIsEditMode(true);
    setCurrentUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      roleId: user.roles.length > 0 ? user.roles[0]._id : '',
      membershipId: user.membership.length > 0 ? user.membership[0]._id : '',
    });
    setIsModalVisible(true);
  };
  
  const handleDelete = async (userId) => {
    if (userId === loggedInUserId) {
      message.error('You cannot delete your own account.');
      return;
    }

    try {
      await deleteUser({ variables: { deleteUserId: userId } });
      message.success('User deleted successfully');
      refetch();
    } catch (error) {
      message.error(`Failed to delete user: ${error.message}`);
    }
  };

  const filteredUsers = data && data.Users ? data.Users.filter(user => user._id !== loggedInUserId) : [];

  const handleOk = async () => {
    try {
      const values = formData;
      const input = {
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        email: values.email,
        password: values.password,
        dateOfBirth: values.dateOfBirth,
        roles: [formData.roleId],
        membership: [formData.membershipId],
      };
console.log("input", input)
      if (isEditMode) {
        await updateUser({ variables: { updateUserId: currentUser._id, input } });
        message.success('User updated successfully');
      } else {
        await createUser({ variables: { input } });
        message.success('User created successfully');
      }
      refetch();
      rolesRefetch();
      membershipRefetch();
      setIsModalVisible(false);
    } catch (error) {
      message.error(`Failed to ${isEditMode ? 'update' : 'create'} user: ${error.message}`);
    }
  };

const handleCancel = () => {
  setIsModalVisible(false);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const renderRoles = (roles) => {
    if (!roles || roles.length === 0) {
      return 'N/A';
    }
    if (!rolesData || !rolesData.Roles) {
      return 'Loading...';
    }
    return roles.map(role => {
      const roleId = typeof role === 'object' ? role._id : role;
      const roleInfo = rolesData.Roles.find(r => r._id === roleId);
      return roleInfo ? roleInfo.name : 'Unknown';
    }).join(', ');
  };
  
  const renderMemberships = (memberships) => {
    if (!memberships || memberships.length === 0) {
      return 'N/A';
    }
    if (!membershipsData || !membershipsData.Memberships) {
      return 'Loading...';
    }
    return memberships.map(membership => {
      const membershipId = typeof membership === 'object' ? membership._id : membership;
      const membershipInfo = membershipsData.Memberships.find(m => m._id === membershipId);
      return membershipInfo ? membershipInfo.name : 'Unknown';
    }).join(', ');
  };
  
  const columns = [
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Username', dataIndex: 'userName', key: 'userName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Date of Birth', dataIndex: 'dateOfBirth', key: 'dateOfBirth' },
    { title: 'Roles', dataIndex: 'roles', key: 'roles', render: renderRoles },
    { title: 'Memberships', dataIndex: 'membership', key: 'membership', render: renderMemberships },
    {
      title: 'Actions', key: 'actions', render: (text, user) => (
        <span>
          <Button type="link" onClick={() => showEditModal(user)}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(user._id)}>Delete</Button>
        </span>
      ),
    },
  ];
    

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.h1}>Admin Control Panel</h1>
          <div className={styles['button-group']}>
            <Link href="/">
              <Button type="primary">Back to Home</Button>
            </Link>
            <Button type="primary" onClick={showCreateModal}>Create User</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
        <Table className={styles.table} columns={columns} dataSource={filteredUsers} rowKey="_id" />
        <Modal
          title={isEditMode ? 'Edit User' : 'Create User'}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form layout="vertical" className={styles.modalForm}>
            <Form.Item label="First Name" required>
              <Input name="firstName" value={formData.firstName} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Last Name" required>
              <Input name="lastName" value={formData.lastName} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Username" required>
              <Input name="userName" value={formData.userName} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input name="email" value={formData.email} onChange={handleChange} type="email" />
            </Form.Item>
            <Form.Item label="Password" required>
              <Input.Password name="password" value={formData.password} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Date of Birth" required>
              <Input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" />
            </Form.Item>
            <Form.Item label="Role" required>
  {rolesData && rolesData.Roles ? (
    <select
      value={formData.roleId}
      onChange={(e) => setFormData((prevData) => ({ ...prevData, roleId: e.target.value }))}
    >
      <option value="" disabled>Select Role</option>
      {rolesData.Roles.map(role => (
        <option key={role._id} value={role._id}>{role.name}</option>
      ))}
    </select>
  ) : (
    <p>Loading Roles...</p>
  )}
</Form.Item>
<Form.Item label="Membership" required>
  {membershipsData && membershipsData.Memberships ? (
    <select
      value={formData.membershipId}
      onChange={(e) => setFormData((prevData) => ({ ...prevData, membershipId: e.target.value }))}
    >
      <option value="" disabled>Select Membership</option>
      {membershipsData.Memberships.map(membership => (
        <option key={membership._id} value={membership._id}>{membership.name}</option>
      ))}
    </select>
  ) : (
    <p>Loading Memberships...</p>
  )}
</Form.Item>


          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Admin;
