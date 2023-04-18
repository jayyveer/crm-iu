import { ErrorMessage, Formik, FieldArray, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  Button,
  Row,
  Col,
  Container,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import Navbar from "../Navbar";
import moment from "moment";

interface UrlData {
  type: string;
  url: string;
}

interface FormModal {
  projectName: string;
  clientName: string;
  status: string;
  startDate: any;
  endDate: any;
  urls: UrlData[];
  // _id: string
}

interface ProjectFieldsProps {
  operation: "add" | "edit";
  data?: FormModal;
}

const ProjectFields: React.FC<ProjectFieldsProps> = ({ operation, data }) => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const {id} = useParams();

  const initialValues: FormModal = {
    projectName: data?.projectName ? data?.projectName : "",
    clientName: data?.clientName ? data?.clientName : "",
    status: data?.status ? data?.status : "",
    startDate: data?.startDate
      ? moment(data?.startDate).format("YYYY-MM-DD")
      : "",
    endDate: data?.endDate ? moment(data?.endDate).format("YYYY-MM-DD") : "",
    urls: data?.urls ? data?.urls : [{ type: "", url: "" }],
    // _id: data?._id? data?._id:"",
  };

  const { string, date, array, object, ref } = Yup;

  const fieldsSchema = object().shape({
    projectName: string().required("Project Name is required"),
    clientName: string(),
    status: string(),
    startDate: date(),
    endDate: date().min(
      ref("startDate"),
      "End date should be after start date"
    ),
    // urls: array().of(
    //       object().shape({
    //         type: string().when("url", {
    //           is: (url: string) => (url && url.trim().length > 0) as boolean,
    //           then: string().required("Type is required when URL is provided").notOneOf([""], "Type cannot be empty"),
    //           otherwise: string().notRequired()
    //         }),
    //         url: string().when("type", {
    //           is: (type: string) => (type && type.trim().length > 0) as boolean,
    //           then: string()
    //             .url("Invalid URL")
    //             .required("URL is required when type is provided").notOneOf([""], "URL cannot be empty"),
    //           otherwise: string().notRequired()
    //         })
    //       })
    //     ),
    urls: Yup.array().of(
      Yup.object().shape({
        type: Yup.string(),
        url: Yup.string(),
      })
    ),
  });
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const addProject = async (values: FormModal) => {
    try {
      const response = await axios.post(
        `${apiUrl}/project`,
        values,
        config
      );
      navigate("/projects");
      message.success("Project Added");
    } catch (error) {
      console.log("----------Error---------", error);
      message.error("Cannot add Project");
    }
  };
  const editProject = async(values: any) => {
    try {
        const response = await axios.put(
          `${apiUrl}/project/${id}`,
          values,
          config
        );
        navigate("/projects");
        message.success("Project Edited");
    } catch (error) {
      console.log("----------Error---------", error);
      message.error("Cannot Edit Project");
    }
  }

  const handleCancel = () => {
    navigate("/projects");
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="card-bg w-100 border d-flex flex-column">
          <div className="p-4 d-flex flex-column h-100">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="m-0 h5 font-weight-bold text-dark">
                {operation === "add" ? "Add Project" : "Edit Project"}
              </h4>
              <div className="py-1 px-2 bg-grey rounded-circle">
                <i className="fas fa-suitcase"></i>
              </div>
            </div>
            <div
              className="card-bg w-100 border d-flex flex-column p-4"
              style={{ gridRow: "span 2" }}
            >
              <div>
                <Container>
                  <>
                    <Row>
                      <Col>
                        <Container className="w-75">
                          <Formik<FormModal>
                            initialValues={initialValues}
                            validationSchema={fieldsSchema}
                            onSubmit={(values) => {
                              operation === "add"
                                ? addProject(values)
                                : editProject(values);
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
                                    <FormGroup
                                      controlId="projectName"
                                      className="py-3"
                                    >
                                      <FormLabel>Project Name *</FormLabel>
                                      <FormControl
                                        type="text"
                                        name="projectName"
                                        placeholder="Enter Project Name"
                                        value={values.projectName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      ></FormControl>
                                      {errors.projectName &&
                                      touched.projectName ? (
                                        <span className="py-1 text-danger">
                                          <ErrorMessage
                                            name="projectName"
                                            component="div"
                                            className="text-danger"
                                          />
                                        </span>
                                      ) : null}
                                    </FormGroup>

                                    <FormGroup
                                      controlId="projectName"
                                      className="py-3"
                                    >
                                      <FormLabel>Project Start Date</FormLabel>
                                      <FormControl
                                        type="date"
                                        name="startDate"
                                        placeholder="Enter project start date"
                                        value={values.startDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      ></FormControl>
                                      {errors.startDate && touched.startDate ? (
                                        <span className="py-1 text-danger">
                                          <ErrorMessage
                                            name="startDate"
                                            component="div"
                                            className="text-danger"
                                          />
                                        </span>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                  <Col>
                                    <FormGroup
                                      controlId="clientName"
                                      className="py-3"
                                    >
                                      <FormLabel>Client Name</FormLabel>
                                      <FormControl
                                        type="text"
                                        name="clientName"
                                        placeholder="Enter Client Name"
                                        value={values.clientName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      ></FormControl>
                                      {errors.clientName &&
                                      touched.clientName ? (
                                        <span className="py-1 text-danger">
                                          <ErrorMessage
                                            name="clientName"
                                            component="div"
                                            className="text-danger"
                                          />
                                        </span>
                                      ) : null}
                                    </FormGroup>

                                    <FormGroup
                                      controlId="projectName"
                                      className="py-3"
                                    >
                                      <FormLabel>Project End Date</FormLabel>
                                      <FormControl
                                        type="date"
                                        name="endDate"
                                        placeholder="Enter project end date"
                                        value={values.endDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      ></FormControl>
                                      {errors.endDate && touched.endDate ? (
                                        <span className="py-1 text-danger">
                                          <ErrorMessage
                                            name="endDate"
                                            component="div"
                                            className="text-danger"
                                          />
                                        </span>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                  <Row>
                                    <FormLabel>Site URL(s)</FormLabel>
                                  </Row>
                                  <FieldArray name="urls">
                                    {({ push, remove }) => (
                                      <>
                                        {values.urls.map((url, index) => (
                                          <>
                                            <FormGroup
                                              key={index}
                                              className="py-2"
                                            >
                                              <Row>
                                                <Col md={5}>
                                                  <FormControl
                                                    type="text"
                                                    placeholder="Enter type of URL"
                                                    name={`urls.${index}.type`}
                                                    value={url.type}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    //   isInvalid={
                                                    //     touched.urls?.[index]
                                                    //       ?.type &&
                                                    //     !!errors.urls?.[index]?.type
                                                    //   }
                                                  />
                                                  <FormControl.Feedback type="invalid">
                                                    {/* {errors.urls?.[index]?.type} */}
                                                    <ErrorMessage
                                                      name={`urls.${index}.type`}
                                                      component="div"
                                                      className="text-danger"
                                                    />
                                                  </FormControl.Feedback>
                                                </Col>
                                                <Col md={6}>
                                                  <FormControl
                                                    type="text"
                                                    name={`urls.${index}.url`}
                                                    placeholder="Enter URL"
                                                    value={url.url}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    //   isInvalid={
                                                    //     touched.urls?.[index]?.url &&
                                                    //     !!errors.urls?.[index]?.url
                                                    //   }
                                                  />
                                                  <FormControl.Feedback type="invalid">
                                                    {/* {errors.urls?.[index]?.url} */}
                                                    <ErrorMessage
                                                      name={`urls.${index}.url`}
                                                      component="div"
                                                      className="text-danger"
                                                    />
                                                  </FormControl.Feedback>
                                                </Col>
                                                <Col
                                                  md={1}
                                                  className="d-flex justify-content-center align-items-center mt-auto"
                                                >
                                                  {values.urls.length < 5 &&
                                                    index < 1 && (
                                                      <Button
                                                        variant="primary"
                                                        type="button"
                                                        className="rounded-4"
                                                        onClick={() =>
                                                          push({
                                                            type: "",
                                                            url: "",
                                                          })
                                                        }
                                                      >
                                                        +
                                                      </Button>
                                                    )}
                                                  {index > 0 && (
                                                    <Button
                                                      variant="danger"
                                                      className="rounded-4"
                                                      onClick={() =>
                                                        remove(index)
                                                      }
                                                    >
                                                      -
                                                    </Button>
                                                  )}
                                                </Col>
                                              </Row>
                                            </FormGroup>
                                          </>
                                        ))}
                                      </>
                                    )}
                                  </FieldArray>

                                  <Col>
                                    <FormGroup
                                      controlId="status"
                                      className="py-3"
                                    >
                                      <FormLabel>Status</FormLabel>
                                      <FormControl
                                        as="select"
                                        value={values.status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      >
                                        <option value="">Select status</option>
                                        <option value="Active">Active</option>
                                        <option value="In Active">
                                          Inactive
                                        </option>
                                        <option value="In Progress">
                                          In Progress
                                        </option>
                                        <option value="Completed">
                                          Completed
                                        </option>
                                        <FormControl.Feedback type="invalid">
                                          <ErrorMessage
                                            name="status"
                                            component="div"
                                            className="text-danger"
                                          />
                                        </FormControl.Feedback>
                                      </FormControl>
                                    </FormGroup>
                                  </Col>
                                  <Col></Col>
                                </Row>

                                <center>
                                  <Button
                                    type="submit"
                                    variant="primary"
                                    className=" btn-sm  rounded-2 p-2 m-2"
                                    style={{ width: "200px" }}
                                  >
                                    {operation === "add"
                                      ? "Add Project"
                                      : "Edit Project"}
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="primary"
                                    className=" btn-sm rounded-2 p-2 m-2"
                                    style={{ width: "200px" }}
                                    onClick={handleCancel}
                                  >
                                    Cancel
                                  </Button>
                                </center>
                              </Form>
                            )}
                          </Formik>
                        </Container>
                      </Col>
                    </Row>
                  </>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFields;
