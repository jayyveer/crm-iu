import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import * as Yup from "yup";

interface ProjectData {
  projectName: string;
  urls: UrlData[];
}

interface UrlData {
  type: string;
  url: string;
}


export const ProjectForm = () => {
  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required("Required"),
    urls: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required("Required"),
        url: Yup.string().required("Required"),
      })
    ),
  });

  const initialValues = {
    projectName: "",
    urls: [{ type: "", url: "" }],
  };

  const handleSubmit = (values: ProjectData) => {
    console.log("test values",values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
          <FormGroup>
            <FormLabel htmlFor="projectName">Project Name</FormLabel>
            <FormControl
              type="text"
              name="projectName"
              value={values.projectName}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.projectName && !!errors.projectName}
            />
            <FormControl.Feedback type="invalid">
              {errors.projectName}
            </FormControl.Feedback>
          </FormGroup>

          <FieldArray name="urls">
            {({ push, remove }) => (
              <>
                {values.urls.map((url, index) => (
                  <FormGroup key={index}>
                    <FormLabel htmlFor={`urls.${index}.type`}>
                      URL Type
                    </FormLabel>
                    <FormControl
                      type="text"
                      name={`urls.${index}.type`}
                      value={url.type}
                      onChange={handleChange}
                      onBlur={handleBlur}

                      // isInvalid={
                      //   formik.touched.urls?.[index]?.type &&
                      //   !!formik.errors.urls?.[index]?.type
                      // }
                    />
                    {/* <FormControl.Feedback type="invalid">
                      {/* {formik.errors.urls?.[index]?.type} */}
                    {/* <ErrorMessage
                        name={`urls.${index}.type`}
                        component="div"
                        className="text-danger"
                      /> */}
                    {/* </FormControl.Feedback> */}

                    <FormLabel htmlFor={`urls.${index}.url`}>URL</FormLabel>
                    <FormControl
                      type="text"
                      name={`urls.${index}.url`}
                      value={url.url}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      //   isInvalid={
                      //     formik.touched.urls?.[index]?.url &&
                      //     !!formik.errors.urls?.[index]?.url
                      //   }
                    />
                    <FormControl.Feedback type="invalid">
                      {/* {formik.errors.urls?.[index]?.url} */}
                      <ErrorMessage
                        name={`urls.${index}.url`}
                        component="div"
                        className="text-danger"
                      />
                    </FormControl.Feedback>

                    {index > 0 && (
                      <Button variant="danger" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    )}
                  </FormGroup>
                ))}

                {values.urls.length < 5 && (
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => push({ type: "", url: "" })}
                  >
                    Add URL
                  </Button>
                )}
              </> 
            )}
          </FieldArray>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};
