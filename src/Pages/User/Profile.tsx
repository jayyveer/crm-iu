import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/Sidebar';
import ChangePassword from '../Auth/ChangePassword';
import UserInformation from '../Auth/UserInformation';

const Profile = () => {
  return (
    <div>
      <div>
        <div className="dashboard d-flex">
          <div>
            <SideBar />
          </div>
          <div
            style={{
              flex: "1 1 auto",
              display: "flex",
              flexFlow: "column",
              height: "100vh",
              overflowY: "hidden",
            }}
          >
            <Navbar />
            <UserInformation/>
            <ChangePassword />
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default Profile
