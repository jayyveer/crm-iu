import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";


const UserInformation = () => {
    const userName = localStorage.getItem("name") ?? "";
    const email = localStorage.getItem("email") ?? "";
    const role = 'Admin'
  return (
    <div>
      <Container className="p-5 w-100">
        <div className="d-flex align-items-center justify-content-between">
          <h4 className="m-0 h5 font-weight-bold text-dark">
            User Information
          </h4>
          <div className="py-1 px-2 bg-grey rounded-circle">
            <i className="fas fa-suitcase"></i>
          </div>
        </div>
        <div className="card-bg w-100 border d-flex flex-column p-5">
          <Row className="align-items-center">
            <Col xs={3}>
              <img
                src="https://via.placeholder.com/150x150.png?text=User+Avatar"
                alt="User Avatar"
                className="rounded-circle"
              />
            </Col>
            <Col xs={9}>
              <div>
                <h4>{userName} ({role})</h4>
                <p>{email}</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default UserInformation;
