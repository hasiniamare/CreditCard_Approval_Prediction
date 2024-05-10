import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './signout.css';

const SignOutModal = ({ show, onHide, onSignOut }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to sign out?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={onSignOut}>Sign Out</Button>
      </Modal.Footer>
    </Modal>
  );
};

const SignOutButton = () => {
  const [showModal, setShowModal] = React.useState(false);
  const history = useNavigate();

  const handleSignOut = () => {
    try {
      console.log('Signing out...');
      localStorage.clear();
      history('/login');
    } catch (error) {
      console.error('Signout failed:', error);
    }
  };

  return (
    <>
      <Button variant="danger" className='signout' onClick={() => setShowModal(true)}>Sign Out</Button>
      <SignOutModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSignOut={handleSignOut}
      />
    </>
  );
};

export default SignOutButton;