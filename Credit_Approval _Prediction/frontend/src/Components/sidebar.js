// Sidebar.js

import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // If using React Router
import { FaHome, FaBriefcase, FaCheckCircle, FaUsers, FaChartBar, FaQuestionCircle } from 'react-icons/fa'; // Import icons from react-icons library
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Item>
          <NavLink to="/" className="nav-link">
            <FaHome className="icon" /> Dash Board
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/application" className="nav-link">
            <FaBriefcase className="icon" /> Applications
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/eligibility" className="nav-link">
            <FaCheckCircle className="icon" /> Eligibility
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/usermanagement" className="nav-link">
            <FaUsers className="icon" /> User Management
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/model-management" className="nav-link">
            <FaChartBar className="icon" /> Model Management
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/reports" className="nav-link">
            <FaChartBar className="icon" /> Reports
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/help" className="nav-link">
            <FaQuestionCircle className="icon" /> Help
          </NavLink>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
