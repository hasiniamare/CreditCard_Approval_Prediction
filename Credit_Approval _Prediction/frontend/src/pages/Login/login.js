import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'; // Import Card from react-bootstrap
import './login.css'; // Make sure the path is correct for your login.css file
import imageSrc from '../../images/login1.jpg'; // Import your image source here

const LoginForm = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get history object from React Router

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    setError(null); 
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        // Store the username and userRole in local storage
        localStorage.setItem('username', username);
        localStorage.setItem('userRole', data.userRole);
        
        // Check user role and log accordingly
        if (data.userRole === 'admin') {
          console.log('admin');
        } else {
          console.log('assistant');
        }
  
        navigate('/dashboard');
      } else {
        setError(data.message); // Set error message when login fails
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in'); // Set error message for other errors
    }
  };
  
  return (
    <Container fluid className="login-main">
      <Row>
        <Col md={12}>
          <Card className="login-card">
            <Row>
              <Col md={6} className="login-left">
                <img src={imageSrc} alt="loginimg" className="image" />
              </Col>
              <Col md={6} className="login-right">
                <Form onSubmit={handleSubmit} className="login-form">
                  <h2>Login</h2>
                  <Form.Group controlId="email">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      className='form-control'
                      type="text"
                      value={username}
                      onChange={(e) => setusername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="remember">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                  
                  <Button variant="primary" type="submit">
                    LOGIN
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;


