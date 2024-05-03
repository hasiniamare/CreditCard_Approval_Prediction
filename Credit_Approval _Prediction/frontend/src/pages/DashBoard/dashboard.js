import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './dashboard.css' // Make sure the path is correct for your dashboard.css file

const Dashboard = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3001/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [data]);
  return (
    <Container fluid className="dashboard-container">
      <h1>Dashboard</h1>
      <Row>
        <Col md={6} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Applications</Card.Title>
              <Card.Text>
                Manage and track applications.
              </Card.Text>
              <Button variant="primary">Go to Applications</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Eligibility</Card.Title>
              <Card.Text>
                Manage eligibility criteria.
              </Card.Text>
              <Button variant="primary">Go to Eligibility</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>User Management</Card.Title>
              <Card.Text>
                Manage user roles and permissions.
              </Card.Text>
              <Button variant="primary">Go to User Management</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Model Management</Card.Title>
              <Card.Text>
                Manage machine learning models.
              </Card.Text>
              <Button variant="primary">Go to Model Management</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

