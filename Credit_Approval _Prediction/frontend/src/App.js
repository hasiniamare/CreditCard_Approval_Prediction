// App.js
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { Nav } from 'react-bootstrap';
import Navigationbar from "./Components/navbar";
//import Sidebar from "./Components/sidebar";
import CreditPredictionForm from './pages/prediction/credit_info';
import ResultSheet from './pages/prediction/eligibility';
import Login from "./pages/Login/login";
import Dashboard from './pages/DashBoard/dashboard';
import Applicant from './pages/Application/application';
import UserManagement from './pages/UserManagement/usermanagement';
import SignOut from "./pages/SignOut/signout";
import HomePage from "./pages/Home/home";
import Register from "./pages/Registration/register";
import Analysis from "./pages/Reports/analysis";


function App() {
  const [results, setResults] = useState(null);
  const [loggedInUsername, setLoggedInUsername] = useState(null); // State to store logged-in username
  const [userRole, setUserRole] = useState(null); // State to store user role
  const handleLogin = (username, userRole) => {
    setLoggedInUsername(username);
    setUserRole(userRole);

  };
  
  return (
    <Router>
      <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <Navigationbar />
        
        
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <Routes>
                <Route path="/register" element={<Register setResults={setResults} />} />
                <Route path="/login" element={<Login setResults={setResults} />} />
                <Route path="/" element={<HomePage setResults={setResults} />} />
                <Route path="/dashboard" element={<Dashboard setResults={setResults} />} />
                <Route path="/prediction" element={<CreditPredictionForm setResults={setResults} />} />
                <Route path="/analysis" element={<Analysis setResults={setResults} />} />
                <Route path="/result" element={<ResultSheet results={results} />} />
                <Route path="/application" element={<Applicant />} /> {/* Add this line */}
                <Route path="/test" element={<UserManagement results={results} onLogin={handleLogin} username={loggedInUsername}  userRole={userRole}/>} />
                <Route path="/signout" element={<SignOut/>} /> {/* Add this line */}
                
                
              </Routes>
            </div>
          </div>
        </div>

      </div>
    </Router>
  );
}

export default App;







