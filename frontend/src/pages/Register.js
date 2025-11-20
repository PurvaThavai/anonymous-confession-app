// My register page is built using Formik for form handling and Yup for frontend validation.
// When the user enters data, Yup checks fields in real time based on my signUpSchema.
// Once the form is valid and submitted, Formik passes the data to a function called registerUser, which sends the details to the backend using an Axios POST request.
// The backend saves the user in the database and returns a success message. After that, my frontend shows an alert and navigates to the login page.


// Yup is a JavaScript validation library that defines rules and constraints for your form fields.
// It works beautifully with Formik to validate input data.


// formik library : 
// formik - main wrapper component that handles form state and validation
// form - replace form tag
// field - replace input tag
// errormessage - display validation error message
import { Formik, Form, Field, ErrorMessage } from "formik";
//boostrap inports
import {Col,Container,Form as BootstrapForm,Row} from "react-bootstrap";
//validation scema file for frontend validation 
import { signUpSchema } from "../schemas/SignUpSchema";
// function from UserService that sends registration data to backend
import { registerUser } from "../services/UserService";
//react router hook to redirect user
import { useNavigate } from "react-router-dom";



// functional component - Register
export function Register() {
  const nav = useNavigate(); // used to navigate programmatically to onether route

  // handleSubmit run when form is submitted
  // formData - receive form values entered by the user
  // resetForm - helper function to clea the form
  const handleSubmit = async (formData, { resetForm }) => {
    try {
      const response = await registerUser(formData); // calls backedn through axios and connect Fronte to backe
      alert(response.message); // if registration success then show alert with backend message
      nav("/login"); // then navigate to login page  as user need to login after register
      resetForm();// clear the form using resetForm()
    } catch (error) { // if any duplcicate values appear or doent match expectation for password then will show registration fail alert
      alert(error?.response?.message || "Registration Failed");
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4" style={{ color: "#6a1b9a" }}>
        Register
      </h2>
      <Row>
        <Col className="col-md-6 mx-auto">
          <Formik
            initialValues={{ name: "", email: "", password: "", phone: "" }}
            validationSchema={signUpSchema}
            onSubmit={handleSubmit}
          >
{/* 
formik is an object that contains everything about your form’s state, validation, values, and event handlers.

error : Contains validation error messages for fields that fail your validation schema (for example, in signUpSchema using Yup).

touched : Keeps track of which fields the user has visited or clicked.

dirty : Becomes true when the user makes any change in the form. If the user hasn’t typed or changed anything, dirty is false.

isValid : Becomes true only when the form passes all validation rules. If there’s any validation error, this becomes false.

handleChange : This is a function provided by Formik to handle input changes automatically.

value : Stores the current values of all input fields in your form. */}


            {(formik) => {
              const { errors, touched, dirty, isValid, handleChange, values } =
                formik;

              return (
                <BootstrapForm as={Form}>
                  <BootstrapForm.Group className="mb-3">
                    {/* <BootstrapForm.Label>Name</BootstrapForm.Label> */}
                    <BootstrapForm.Control
                      as={Field}
                      type="text"
                      placeholder="Enter Username"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      isInvalid={touched.name && errors.name}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="name" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    {/* <BootstrapForm.Label>Email</BootstrapForm.Label> */}
                    <BootstrapForm.Control
                      as={Field}
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      isInvalid={touched.email && errors.email}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="email" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    {/* <BootstrapForm.Label>Password</BootstrapForm.Label> */}
                    <BootstrapForm.Control
                      as={Field}
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      isInvalid={touched.password && errors.password}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="password" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    {/* <BootstrapForm.Label>Phone</BootstrapForm.Label> */}
                    <BootstrapForm.Control
                      as={Field}
                      type="text"
                      placeholder="Enter phone number"
                      name="phone"
                      onChange={handleChange}
                      value={values.phone}
                      isInvalid={touched.phone && errors.phone}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="phone" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  {/* <Button variant="primary" type="submit" disabled={!(dirty && isValid)}>
                                        Submit
                                    </Button> */}

                  <button
                    className="btn w-100"
                    type="submit"
                    style={{
                      background: "linear-gradient(90deg,rgb(255, 0, 85),rgb(246, 112, 156))",
                      color: "#fff",
                    }}
                    disabled={!(dirty && isValid)}
                  >
                   Register
                  </button>
                </BootstrapForm>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
export default Register;
