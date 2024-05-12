// Sidebar.js

import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // If using React Router
import { FaHome, FaBriefcase, FaCheckCircle, FaUsers, FaChartBar } from 'react-icons/fa'; // Import icons from react-icons library
import './sidebar.css';




function Sidebar() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');

useEffect(() => {
  localStorage.setItem('userRole', userRole);
  const storedUserRole = localStorage.getItem('userRole');
  if (storedUserRole) {
    setUserRole(storedUserRole);
  }
}, [userRole]);

  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Item>
          <NavLink to="/dashboard" className="nav-link">
            <FaHome className="icon" /> Dash Board
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/application" className="nav-link">
            <FaBriefcase className="icon" /> Applications
          </NavLink>
        </Nav.Item>
        {userRole === 'admin' &&(<Nav.Item>
          <NavLink to="/register" className="nav-link">
            <FaCheckCircle className="icon" /> User Registration
          </NavLink>
        </Nav.Item>
        )}
        <Nav.Item>
          <NavLink to="/userprofile" className="nav-link">
            <FaUsers className="icon" /> User Profile
          </NavLink>
        </Nav.Item>
        
        <Nav.Item>
          <NavLink to="/analysis" className="nav-link">
            <FaChartBar className="icon" /> Reports
          </NavLink>
        </Nav.Item>
        
      </Nav>
    </div>
  );
}

export default Sidebar;
