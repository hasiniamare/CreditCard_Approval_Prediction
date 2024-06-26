
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import './UserProfiles.css';
//import WecomeBackground from '../images/LabBackground.jpeg'
import Sidebar from '../../Components/sidebar';
import axios from 'axios';

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const fetchUserProfiles = async () => {
    try {
      const response = await fetch('http://localhost:4000/user-profiles');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch user profiles');
      }
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  const handleUpdate = (user) => {
    setUpdatedUser(user);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:4000/user-profiles/${updatedUser.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });
      if (response.ok) {
        console.log('User updated successfully');
        setShowModal(false);
        fetchUserProfiles(); // Refresh user profiles
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = async (user) => {
    try {
      await axios.delete(`http://localhost:4000/user-profiles/${user.username}`);
      await fetchUserProfiles();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

 

  return (
    <>
    <Sidebar/>
    <div className="container-fluid users-profile" >
      <div>
        <h4 className='user-profile_title'></h4>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className='t-head'>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th className="d-none d-sm-table-cell">Address</th>
              <th className="d-none d-sm-table-cell">User Role</th>
              <th>Username</th>
              <th className="d-none d-sm-table-cell">Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
                <td className="d-none d-sm-table-cell">{user.address}</td>
                <td className="d-none d-sm-table-cell">{user.userRole}</td>
                <td>{user.username}</td>
                <td className="d-none d-sm-table-cell">{user.password}</td>
                <td>
                  <Button variant="secondary btn-width" onClick={() => handleUpdate(user)}>Update</Button>{' '}
                  <Button variant="danger btn-delete-width " onClick={() => handleDelete(user)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update User Modal */}
      <Modal show={showModal} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Update User</Modal.Title>
  </Modal.Header>
  <Modal.Body className='edit-model'>
    <Form className='form-data'>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control className='bg-light text-dark'  type="text" placeholder="Enter name" value={updatedUser ? updatedUser.name : ''} onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control className='bg-light text-dark' type="email" placeholder="Enter email" value={updatedUser ? updatedUser.email : ''} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="formMobileNumber">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control className='bg-light text-dark' type="text" placeholder="Enter mobile number" value={updatedUser ? updatedUser.mobileNumber : ''} onChange={(e) => setUpdatedUser({ ...updatedUser, mobileNumber: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control className='bg-light text-dark' type="text" placeholder="Enter address" value={updatedUser ? updatedUser.address : ''} onChange={(e) => setUpdatedUser({ ...updatedUser, address: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="formUserRole">
        <Form.Label>User Role</Form.Label>
        <Form.Control className='bg-light text-dark' as="select" value={updatedUser ? updatedUser.userRole : ''} onChange={(e) => setUpdatedUser({ ...updatedUser, userRole: e.target.value })}>
          <option value="manager">Manager</option>
          <option value="assistant">Assistant</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control className='bg-light text-dark' type="text" placeholder="Enter username" value={updatedUser ? updatedUser.username : ''} onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control className='bg-light text-dark' type="password" placeholder="Enter password" value={updatedUser ? updatedUser.password : ''} onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })} />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="success" onClick={handleSave}>
      Save
    </Button>
  </Modal.Footer>
</Modal>

    </div>
    </>
  );
}

export default UserProfile;



