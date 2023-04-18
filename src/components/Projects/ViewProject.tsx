import React from 'react'
import Navbar from '../Navbar'
import SideBar from '../Sidebar';
import { useLocation } from 'react-router';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

const ViewProject = () => {

const { state } = useLocation();


  return (
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
            // height: "100vh",
            overflowY: "hidden",
          }}
        >
          <Navbar />
          <div>
            <div className="card-bg w-100 border d-flex flex-column">
              <div className="p-4 d-flex flex-column h-100">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="m-0 h5 font-weight-bold text-dark">
                    Project Details
                  </h4>
                  <div className="py-1 px-2 bg-grey rounded-circle">
                    <i className="fas fa-suitcase"></i>
                  </div>
                </div>
                <div
                  className="card-bg w-100 border d-flex flex-column p-4"
                  style={{ gridRow: "span 2" }}
                >
                  {/* <>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Client Name:</strong>{" "}
                        {state.state.state.projectData.clientName}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Project Name:</strong>{" "}
                        {state.state.state.projectData.projectName}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Start Date:</strong>{" "}
                        {state.state.state.projectData.startDate
                          ? new Date(
                              state.state.state.projectData.startDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>End Date:</strong>{" "}
                        {state.state.state.projectData.endDate
                          ? new Date(
                              state.state.state.projectData.endDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Status:</strong>{" "}
                        {state.state.state.projectData.status
                          ? state.state.state.projectData.status
                          : "In Progress"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Created At:</strong>{" "}
                        {new Date(
                          state.state.state.projectData.createdAt
                        ).toLocaleDateString()}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Updated At:</strong>{" "}
                        {new Date(
                          state.state.state.projectData.updatedAt
                        ).toLocaleDateString()}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>URLs:</strong>{" "}
                        <ul>
                          {state.state.state.projectData.urls.map(
                            (url: any, index: any) => (
                              <li key={index}>
                                {url.type}: <a href={url.url}>{url.url}</a>
                              </li>
                            )
                          )}
                        </ul>
                      </ListGroup.Item>
                    </ListGroup>
                  </> */}
                  <Row>
                    <Col>
                      <div className="info-item">
                        <h6>Client Name:</h6>
                        <span>{state.projectData.clientName}</span>
                      </div>
                    </Col>
                    <Col>
                      <div className="info-item">
                        <h6>Project Name:</h6>
                        <span>{state.projectData.projectName}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="info-item">
                        <h6>Status:</h6>
                        <span>{state.projectData.status}</span>
                      </div>
                    </Col>
                    <Col>
                      <div className="info-item">
                        <h6>Start Date:</h6>
                        <span>
                          {state.projectData.startDate
                            ? new Date(
                                state.projectData.startDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="info-item">
                        <h6>Created At:</h6>
                        <span>
                          {new Date(
                            state.projectData.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </Col>
                    <Col>
                      <div className="info-item">
                        <h6>End Date:</h6>
                        <span>
                          {state.projectData.endDate
                            ? new Date(
                                state.projectData.endDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="info-item">
                        <h6>URLs:</h6>
                        <ul>
                          {state.projectData.urls.map(
                            (url: any, index: any) => (
                              <li key={index}>
                                <Row>
                                  <Col md={6}>{url.type}:</Col>
                                  <Col md={6}>
                                    <a href={url.url}>{url.url}</a>
                                  </Col>
                                </Row>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProject
