import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom"; // Import BrowserRouter as Router
import { Navbar, Nav } from "react-bootstrap";
import CreditPredictionForm from './pages/prediction/credit_info';
import ResultSheet from './pages/prediction/eligibility';
import Login from "./pages/Login/login";
import Dashboard from './pages/DashBoard/dashboard'

function App() {
  const [results, setResults] = useState(null);

  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/prediction">Credit Prediction</Nav.Link>
            <Nav.Link as={Link} to="/result">Result Sheet</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar>
        <Routes>
          <Route path="/login" element={<Login setResults={setResults} />} />
          <Route path="/" element={<Dashboard setResults={setResults} />} />
          <Route path="/prediction" element={<CreditPredictionForm setResults={setResults} />} />
          <Route path="/result" element={<ResultSheet results={results} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;





