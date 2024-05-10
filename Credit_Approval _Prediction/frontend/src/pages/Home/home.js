import React, { useState } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import CreditPredictionForm from '../prediction/credit_info'; // Adjust the import path as needed
import './home.css';

import BackgroundImg from '../../images/background.jpg';
import CardImage from '../../images/background1.png'; // Import your card image

const HomePage = ({ setResults }) => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handleApplyNow = () => {
    setShowModal(true); // Show modal when "Apply Now" is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <div
      className="home-bg"
      style={{
        Height: '90vh',
        backgroundImage: `url(${BackgroundImg})`, // Set the background image

      }}
    >
      <Row className="justify-content-end align-items-center min-vh-100">
      
        <Col xs={11} className="text-right">
          <h1 className="custom-h1">Welcome</h1><br/><br/>
          <h2 className="custom-h2">to Creditready</h2>
          <p className="custom-paragraph">
            Where we make your financial goals a reality! Say goodbye to
            endless paperwork <br/>and long waiting times. Our expert team is here
            to assist you daily, ensuring easy<br/> approval for your desired
            credit card.
          </p>
          <Row className="justify-content-left align-items-center">
            <Col xs={2} className="text-center mt-3">
              <button
                className="btn btn-secondary apply-btn"
                onClick={handleApplyNow}
              >
                Apply Now
              </button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        style={{ height: '800px' }}
        className="from-modal"
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton style={{ paddingBottom: '20px' }}>
          <Modal.Title>Apply Now</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
          <CreditPredictionForm setResults={setResults} />
        </Modal.Body>
      </Modal>
      <div className="image-container" id="cardimage" >
      <img src={CardImage} alt="Card" className="card-image" />
      </div>
      
    </div>
  );
};

export default HomePage;

