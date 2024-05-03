import React from 'react';
import { Nav} from 'react-bootstrap';
import './navbar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#applications">Applications</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#eligibility">Eligibility</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#user-management">User Management</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#reports">Reports</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#settings">Settings</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Sidebar;

