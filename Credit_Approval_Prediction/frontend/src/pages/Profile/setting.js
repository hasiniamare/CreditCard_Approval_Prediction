import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserProfileCreation from '../Registration/register';
import Profile from './profile';
import UserProfiles from '../UserProfile/UserProfiles';
import Analysis from '../Reports/analysis';

const Settings = ({ loggedInUsername }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (userRole === "manager") {
      localStorage.setItem("activeTab", tab);
    }
  };

  return (
    <div id="viewport">
      <div id="sidebar">
        <ul className="nav">
          <li>
            <Link to="#" className={activeTab === "profile" ? "active" : ""} onClick={() => handleTabClick("profile")}>
              <i className="zmdi zmdi-view-dashboard"></i>
              <i className="fas fa-user"></i> Profile
            </Link>
          </li>
          {userRole === "admin" && (
            <>
              <li>
                <Link to="#" className={activeTab === "analysis" ? "active" : ""} onClick={() => handleTabClick("analysis")}>
                  <i className="zmdi zmdi-link"></i>
                  <i className="fas fa-chart-line"></i> Analysis Report
                </Link>
              </li>
              <li>
                <Link to="#" className={activeTab === "creation" ? "active" : ""} onClick={() => handleTabClick("creation")}>
                  <i className="zmdi zmdi-widgets"></i>
                  <i className="fas fa-user-plus"></i> User Creation
                </Link>
              </li>
              <li>
                <Link to="#" className={activeTab === "userProfiles" ? "active" : ""} onClick={() => handleTabClick("userProfiles")}>
                  <i className="zmdi zmdi-account"></i>
                  <i className="fas fa-users"></i> User Profiles
                </Link>
              </li>
            </>
          )}
          <li>
            {/* Add other sidebar items as needed */}
          </li>
        </ul>
      </div>
      <div id="content">
        {activeTab === "profile" && <Profile username={loggedInUsername} />}
        {activeTab === "analysis" && userRole === "admin" && <Analysis />}
        {activeTab === "creation" && userRole === "admin" && <UserProfileCreation username={loggedInUsername} />}
        {activeTab === "userProfiles" && userRole === "admin" && <UserProfiles />}
      </div>
    </div>
  );
}

export default Settings;
