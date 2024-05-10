// import React, { useState } from 'react';
// import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
// import { FaUserCircle, FaCog, FaSignOutAlt, FaSearch, FaSignInAlt } from 'react-icons/fa';
// import logo from '../images/logo.png';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './navbar.css';

// function Navigationbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const history = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     history('/login'); // Redirect to the login page after logout
//   };

//   const renderNavItems = () => {
//     if (isLoggedIn) {
//       return (
//         <>
//           <Nav.Link href="#profile">
//             <FaUserCircle size={24} />
//           </Nav.Link>
//           <Nav.Link href="#settings">
//             <FaCog size={24} />
//           </Nav.Link>
//           <Nav.Link onClick={handleLogout}>
//             <FaSignOutAlt size={24} />
//           </Nav.Link>
//         </>
//       );
//     } else if (location.pathname === '/login') {
//       return (
//         <Nav.Link href="#signup">
//           <FaSignInAlt size={24} />
//         </Nav.Link>
//       );
//     } else {
//       return (
//         <Nav.Link href="#login">
//           <FaSignInAlt size={24} />
//         </Nav.Link>
//       );
//     }
//   };

//   return (
//     <div className="Navbar">
//       <Navbar bg="red" expand="lg" className="custom-navbar navheight">
//         <Navbar.Brand href="#home">
//           <img
//             src={logo}
//             height="50"
//             className="d-inline-block align-top"
//             alt="React Bootstrap logo"
//           />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Form className="align-items-right custom-search-form position-relative">
//               <FormControl
//                 type="search"
//                 placeholder="Search"
//                 className="mr-2 form-control pl-4 pr-5"
//                 aria-label="Search"
//               />
//               <Button
//                 variant="outline-success"
//                 type="submit"
//                 className="position-absolute top-0 d-flex align-items-center justify-content-left search-button"
//               >
//                 <FaSearch />
//               </Button>
//             </Form>
//           </Nav>
//           <Nav>{renderNavItems()}</Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//   );
// }

// export default Navigationbar;

// import React, { useState } from 'react';
// import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
// import { FaUserCircle, FaCog, FaSignOutAlt, FaSearch, FaSignInAlt } from 'react-icons/fa';
// import logo from '../images/logo.png';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './navbar.css';

// function Navigationbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
  

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     navigate('/login'); // Redirect to the login page after logout
//   };

//   const renderNavItems = () => {
//     if (isLoggedIn) {
//       return (
//         <>
//           <Nav.Link href="#profile">
//             <FaUserCircle size={24} />
//           </Nav.Link>
//           <Nav.Link href="#settings">
//             <FaCog size={24} />
//           </Nav.Link>
//           <Nav.Link onClick={handleLogout}>
//             <FaSignOutAlt size={24} />
//           </Nav.Link>
//         </>
//       );
//     } else if (location.pathname === '/login') {
//       return (
//         <Nav.Link href="/login" className='loginbutton-icon'>
//           <FaSignInAlt size={24} />
//         </Nav.Link>
//       );
//     }
//   };

//   return (
//     <div className="container-center"> {/* Center horizontally and vertically */}
//     <div className="Navbar">

//       <Navbar bg="red" expand="lg" className="custom-navbar navheight fixed-top navbar">
      
//         <Navbar.Brand href="#home">
//           <img
//             src={logo}
//             height="90"
//             width="125"
//             className="d-inline-block align-top logo-image"
//             alt="React Bootstrap logo"
//           />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//           </Nav>
//           <Form className="align-items-right custom-search-form position-relative">
//             <FormControl
//               type="search"
//               placeholder="Search"
//               className="mr-2 form-control pl-4 pr-5 search-bar"
//               aria-label="Search"
//             />
//             <Button
//               variant=""
//               type="submit"
//               className="position-absolute top-0 d-flex align-items-center justify-content-left search-button"
//             >
//               <FaSearch />
//             </Button>
//           </Form>
//           <Nav>{renderNavItems()}</Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//     </div>
//   );
// }

// export default Navigationbar;

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaUserCircle, FaCog, FaSignOutAlt, FaSearch, FaSignInAlt } from 'react-icons/fa';
import logo from '../images/logo.png';
import axios from 'axios'; // Import axios
import { useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';

function Navigationbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/register/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      fetchUserData(username);
      setIsLoggedIn(true); // Set isLoggedIn to true if username exists in localStorage
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove username from localStorage
    localStorage.removeItem('userRole'); // Remove userRole from localStorage
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <div className="container-center">
      <div className="Navbar">
        <Navbar bg="blue" expand="lg" className="custom-navbar navheight fixed-top navbar">
          <Navbar.Brand href="/">
            <img
              src={logo}
              height="90"
              width="125"
              className="d-inline-block align-top logo-image"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navicon">
              <>
                {isLoggedIn && userData && ( // Check isLoggedIn and userData before rendering
                  <div className="nav-item dropdown">
                    <button className="btn dropdown-toggle" type="button" id="profileDropdown"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      <img
                        src={`http://127.0.0.1:4000${userData.profilePicUrl}`}
                        alt="Profile"
                        className="rounded-circle me-1"
                        style={{ width: '40px', height: '40px' }}
                      />
                      {userData.name}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                      <li><a className="dropdown-item" href="http://localhost:3000/settings">Profile</a></li>
                      <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </div>
                )}
                <Nav.Link href="#settings">
                  <FaCog size={24} />
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <FaSignOutAlt size={24} />
                </Nav.Link>
              </>
            </Nav>
            <Form className="align-items-right custom-search-form position-relative">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2 form-control pl-4 pr-5 search-bar"
                aria-label="Search"
              />
              <Button
                variant=""
                type="submit"
                className="position-absolute top-0 d-flex align-items-center justify-content-left search-button"
              >
                <FaSearch />
              </Button>
            </Form>
            {!isLoggedIn && location.pathname === '/' && (
              <Nav.Link href="/login" className='loginbutton-icon'>
                <FaSignInAlt size={24} />
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default Navigationbar;
