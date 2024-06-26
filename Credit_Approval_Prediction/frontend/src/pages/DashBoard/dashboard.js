import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './dashboard.css'; // Make sure the path is correct for your dashboard.css file
import Graph from '../Reports/analysis';
import Sidebar from '../../Components/sidebar';

const Dashboard = () => {
  const [totalCustomerCount, setTotalCustomerCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [totalUserRegistration, setTotalUserRegistration] = useState(0);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');

  useEffect(() => {
    axios.get('http://localhost:4000/total-customer-count')
      .then(response => {
        setTotalCustomerCount(response.data.totalCustomerCount);
      })
      .catch(error => console.error('Error fetching total customer count:', error));

    axios.get('http://localhost:4000/approval-status-count')
      .then(response => {
        setApprovedCount(response.data.approvedCount);
        setRejectedCount(response.data.rejectedCount);
      })
      .catch(error => console.error('Error fetching approval status count:', error));

    axios.get('http://localhost:4000/total-user-registration')
      .then(response => {
        setTotalUserRegistration(response.data.totalUserRegistration);
      })
      .catch(error => console.error('Error fetching total user registration:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, [userRole]);

  return (
    <Container fluid className="dashboard-container">
      <h1>Dashboard</h1>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="sidebar">
          <Sidebar />
        </Col>
        <Col md={6} lg={3}>
          <Card className="dashboard-card totalcustomer">
            <Card.Body>
              <Card.Title>Total Customers</Card.Title>
              <Card.Text>{totalCustomerCount}</Card.Text>
              {/* <Button variant="primary" href="/application" className="totalcustomer-btn">
                Application Status
              </Button> */}
            </Card.Body>
          </Card>
        </Col>
        {userRole === 'admin' && (
          <Col md={6} lg={3}>
            <Card className="dashboard-card totalcustomer" >
              <Card.Body>
                <Card.Title>User Registration</Card.Title>
                <Card.Text>{totalUserRegistration}</Card.Text>
                {/* <Button variant="primary" href="/register" className="totalcustomer-btn">
                  User Register
                </Button> */}
              </Card.Body>
            </Card>
          </Col>
        )}
        
        {/* <Col md={6} lg={3}>
          <Card className="dashboard-card totalcustomer">
            <Card.Body>
              <Card.Title> Graphical Analysis</Card.Title>
              <Card.Text></Card.Text>
              {/* <Button variant="primary" href="/analysis" className="totalcustomer-btn"style={{ marginTop: '42px', marginLeft: '10px', marginRight: '10px', marginBottom: '15px' }}>
                Reports
              </Button> */}
            {/* </Card.Body>
          </Card>
        {/* </Col> */}

        <Col md={6} lg={3}>
          <Card className="dashboard-card totalcustomer" >
            <Card.Body>
              <Card.Title>Customer Eligibility</Card.Title>
              <Card.Text>
                Approved: {approvedCount}
                <br />
                Rejected: {rejectedCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>      
      </Row>
      <div className="centered-graph">
        <Graph />
      </div>
    </Container>
  );
};

export default Dashboard;





