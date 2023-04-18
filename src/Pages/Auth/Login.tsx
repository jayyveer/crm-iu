import { Formik } from "formik";
import React from "react";
import * as Yup from 'yup'
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

interface FormModal{
  email: string,
  password: string
}

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  //Set Initial Values
    const initialValues = {
        email: '',
        password: ''
    };
    //Validation Schema using Yup
    const loginSchema = Yup.object().shape({
        email: Yup.string()
            
            .required('Email is required')
            .matches(/^([a-zA-Z0-9.]+)(|([+])([0-9])+)@([a-zA-Z]+)\.([a-zA_Z])/, 'Email is invalid'),
              //Email will start from number or alphabet have @ then gmail type letters then . and lastly com type letters,
        password: Yup.string()
            .required('Password is required')
    });

    const loginUser = async (values: FormModal) => {
      //API callusing axios and setting name and token value in local storage
      try{                
        const response = await axios.post(`${apiUrl}/auth/login`, values);
        const {token, user} = response.data 
        
        localStorage.setItem("token", token);
        localStorage.setItem('email', user.email)
        localStorage.setItem('name', user.name)
        navigate('/dashboard')
        message.success("Successfuly Logged in")
      }
      catch(error) {
        console.log("----------Error---------", error);
        message.error("Please check Email or Password again");
      }
    }

  return (
    <div>
      <Container className="p-5 w-50">
        <div className="card-bg w-100 border d-flex flex-column p-5">
          <h1 className="text-center pb-3">Credential Management</h1>
          <Row>
            <Col>
              <Container className="w-75">
                <Formik<FormModal>
                  initialValues={initialValues}
                  validationSchema={loginSchema}
                  onSubmit={(values) => {
                    loginUser(values);
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

                      <Form.Group controlId="password" className="py-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></Form.Control>
                        {errors.password && touched.password ? (
                          <span className="py-1 text-danger">
                            {errors.password}
                          </span>
                        ) : null}
                      </Form.Group>

                      <center>
                        <Button
                          type="submit"
                          variant="primary"
                          className="py-2 btn-sm pl-5 pr-5 rounded-4 px-5"
                        >
                          Log In
                        </Button>
                      </center>
                    </Form>
                  )}
                </Formik>
              </Container>
              {/* <Row className="py-3">
                <Col>
                  <center>
                    <Link to={"/forgot-password"} className="">
                      <small>Forgot Password</small>
                    </Link>
                  </center>
                </Col>
              </Row> */}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Login;
