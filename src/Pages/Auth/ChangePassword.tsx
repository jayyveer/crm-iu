import { Formik } from "formik";
import React from "react";
import * as Yup from 'yup'
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

interface FormModal{
  email:string,
  currentPassword:string,
  newPassword:string,
  confirmPassword: string
}

const ChangePassword = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const changePassword = async (values:FormModal) => {
    try{
      const response = await axios.post(
        `${apiUrl}/auth/changePassword`,
        values
      );
      navigate('/dashboard')
      message.success("Password has been changed successfully")
    }
    catch(error){
      console.log("----------Error---------", error);
      message.error("Network Error");
    }
  }

  //Set Initial Values
    const initialValues = {
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword:'',
    };
    //Validation Schema using Yup
    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .matches(/^([a-zA-Z0-9.]+)(|([+])([0-9])+)@([a-zA-Z]+)\.([a-zA_Z])/, 'Email is invalid'),
              //Email will start from number or alphabet have @ then gmail type letters then . and lastly com type letters,
        currentPassword: Yup.string()
            .required('Password is required'),
        newPassword: Yup.string()
            .required('Password is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
            .required('Password is required')
    });

  return (
    <div>
      <Container className="px-5 w-100">
        <div className="d-flex align-items-center justify-content-between">
          <h4 className="m-0 h5 font-weight-bold text-dark">Change Password</h4>
          <div className="py-1 px-2 bg-grey rounded-circle">
            <i className="fas fa-suitcase"></i>
          </div>
        </div>
        <div className="card-bg w-100 border d-flex flex-column p-5">
          {/* <h1 className="text-center pb-3">Change Password</h1> */}
          <Row>
            <Col>
              <Container className="w-100">
                <Formik
                  initialValues={initialValues}
                  validationSchema={loginSchema}
                  onSubmit={(values) => {
                    changePassword(values);
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col>
                          <Form.Group controlId="email" className="py-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Enter email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            ></Form.Control>
                            {errors.email && touched.email ? (
                              <span className="py-1 text-danger">
                                {errors.email}
                              </span>
                            ) : null}
                          </Form.Group>

                          <Form.Group controlId="newPassword" className="py-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="newPassword"
                              placeholder="Enter New Password"
                              value={values.newPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            ></Form.Control>
                            {errors.newPassword && touched.newPassword ? (
                              <span className="py-1 text-danger">
                                {errors.newPassword}
                              </span>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            controlId="currentPassword"
                            className="py-3"
                          >
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="currentPassword"
                              placeholder="Enter Old Password"
                              value={values.currentPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            ></Form.Control>
                            {errors.currentPassword &&
                            touched.currentPassword ? (
                              <span className="py-1 text-danger">
                                {errors.currentPassword}
                              </span>
                            ) : null}
                          </Form.Group>

                          <Form.Group
                            controlId="confirmPassword"
                            className="py-3"
                          >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              placeholder="Confirm Password"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            ></Form.Control>
                            {errors.confirmPassword &&
                            touched.confirmPassword ? (
                              <span className="py-1 text-danger">
                                {errors.confirmPassword}
                              </span>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <center>
                        <Button
                          type="submit"
                          variant="primary"
                          className="py-2 btn-sm pl-5 pr-5 rounded-4 px-5"
                        >
                          Change Password
                        </Button>
                      </center>
                    </Form>
                  )}
                </Formik>
              </Container>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ChangePassword
