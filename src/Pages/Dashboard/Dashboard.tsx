import React from "react";
import { Col, Row } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";

const Dashboard = () => {
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
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          <Navbar />
          <div>
            <div className="card-bg w-100 border d-flex flex-column">
              <div className="p-4 d-flex flex-column h-100">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="m-0 h5 font-weight-bold text-dark">
                    Admin Dashboard
                  </h4>
                  <div className="py-1 px-2 bg-grey rounded-circle">
                    <i className="fas fa-suitcase"></i>
                  </div>
                </div>
                <div
                  className="card-bg w-100 border d-flex flex-column p-4"
                  style={{ gridRow: "span 2" }}
                >
                  <Row>
                    <Col md={4} className="p-lg-5">
                      <div className="card-bg w-100 border d-flex flex-column">
                        <div className="p-4 d-flex flex-column h-100">
                          <h4 className="m-0 h5 text-center font-weight-bold text-dark">
                            Total Projects{" "}
                          </h4>
                          <h4 className="my-4 text-center text-dark h2 font-weight-bold">
                            {" "}
                          </h4>
                        </div>
                      </div>
                    </Col>
                    <Col md={4} className="p-lg-5">
                      <div className="card-bg w-100 border d-flex flex-column">
                        <div className="p-4 d-flex flex-column h-100">
                          <h4 className="m-0 h5 text-center font-weight-bold text-dark">
                            Active Projects
                          </h4>
                          <h4 className="my-4 text-center text-dark h2 font-weight-bold">
                            {""}
                          </h4>
                        </div>
                      </div>
                    </Col>
                    <Col md={4} className="p-lg-5">
                      <div className="card-bg w-100 border d-flex flex-column">
                        <div className="p-4 d-flex flex-column h-100">
                          <h4 className="m-0 h5 text-center font-weight-bold text-dark">
                            In Line Projects
                          </h4>
                          <h4 className="my-4 text-center text-dark h2 font-weight-bold">
                            {""}
                          </h4>
                        </div>
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
};

export default Dashboard;
