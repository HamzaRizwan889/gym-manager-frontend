import React, { useEffect, useState } from 'react';
const { useRouter } = require('next/router');
const Link = require('next/link');
const { getAuthToken, getUserId, logout } = require('../../../services/authService');
const { useQuery, useMutation } = require('@apollo/client');
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../graphql/mutations/mutation';
import { USERS_QUERY, ROLES_QUERY } from '../../graphql/queries/query';
import { useFieldArray } from 'react-hook-form';
import NavBar from '../../components/navbar.js';
const { Table, Button, Modal, Form, Input, message , Select} = require('antd');
const Admin = () => {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      dateOfBirth: '',
      roleId: null,
    });
    const { data, loading, error, refetch } = useQuery(USERS_QUERY);
    const { data: rolesData, loading: rolesLoading, error: rolesError } = useQuery(ROLES_QUERY);
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
  
    useEffect(()=>{
      setLoggedInUserId(getUserId());
    }, [])
    const handleLogout = () => {
      logout();
      router.push('/');
    };
  
    const showCreateModal = () => {
      setIsEditMode(false);
      setFormData({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        roleId: null ,
      });
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
        roleId: user.roles.length > 0 ? user.roles[0]._id : null 
      });
      setIsModalVisible(true);
    };
  
    const handleDelete = async (userId) => {
      if (userId === loggedInUserId) {
        console.log("userId", userId)
        console.log("loggedInUserId", loggedInUserId)
        message.error('You cannot delete your own account.');
        return;
      }
  
      try {
        await deleteUser({ variables: { deleteUserId: userId } });
        message.success('User deleted successfully');
        console.log("userId", userId)
        console.log("loggedInUserId", loggedInUserId)
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
        };
  
        if (isEditMode) {
          await updateUser({ variables: { updateUserId: currentUser._id, input } });
          message.success('User updated successfully');
        } else {
          await createUser({ variables: { input } });
          message.success('User created successfully');
        }
        refetch();
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
  
    const columns = [
      { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
      { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
      { title: 'Username', dataIndex: 'userName', key: 'userName' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      {
        title: 'Actions', key: 'actions', render: (text, user) => (
          <span>
            <Button type="link" onClick={() => showEditModal(user)}>Edit</Button>
            <Button type="link" onClick={() => handleDelete(user._id)}>Delete</Button>
          </span>
        )
      }
    ];
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
      <div>
        <NavBar/>
          <h1 className="h1">Welcome to Admin Control Panel</h1>
          <Link href="/">
              <Button type="primary">Back to Home</Button>
          </Link>
          <Button type="primary" onClick={showCreateModal}>Create User</Button>
          <Button onClick={handleLogout}>Logout</Button>
          <Table columns={columns} dataSource={filteredUsers} rowKey="_id" />

          <Modal
              title={isEditMode ? 'Edit User' : 'Create User'}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
          >
              <Form layout="vertical">
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
                            defaultValue={formData.roleId}
                            onChange={(e) => setFormData((prevData) => ({ ...prevData, roleId: e.target.value }))}
                        >
                            {rolesData.Roles.map(role => (
                                <option key={role._id} value={role._id}>{role.name}</option>
                            ))}
                        </select>
                    ) : (
                        <p>Loading roles...</p>
                    )}
                </Form.Item>
              </Form>
          </Modal>
      </div>
  );
};
  
  export default Admin;