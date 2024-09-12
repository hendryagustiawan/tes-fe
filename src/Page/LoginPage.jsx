import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { successMsg } from "../helper/toastNotification";

export default function LoginPage() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const navigate = useNavigate();

  const handleLogin = (values) => {
    successMsg();
    navigate("/home");
  };

  return (
    <div>
      <div className="account-pages d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Container>
          <Row className="d-flex align-items-center justify-content-evenly">
            <Col md="7" className="px-0">
              <img src="https://images.unsplash.com/photo-1433854304641-67729357fe18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=730&q=80" className="img-fluid rounded" alt="Welcome" />
            </Col>
            <Col md="7" lg="5" xl="5" className="pt-4">
              <Col md="10">
                <h2 className="fw-bold">Hello Again!</h2>
                <h4 className="fw-semibold">We were missing you</h4>
                <hr />
              </Col>
              <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleLogin}>
                {({ handleSubmit, errors, touched }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="email" className="fw-semibold">
                        Email
                      </Label>
                      <Field type="email" name="email" id="email" placeholder="Enter your email" className={`form-control shadow-sm ${touched.email && errors.email ? "is-invalid" : ""}`} />
                      <ErrorMessage name="email" component={FormFeedback} />
                    </FormGroup>

                    <FormGroup>
                      <Label for="password" className="fw-semibold">
                        Password
                      </Label>
                      <Field type="password" name="password" id="password" placeholder="Enter your password" className={`form-control shadow-sm ${touched.password && errors.password ? "is-invalid" : ""}`} />
                      <ErrorMessage name="password" component={FormFeedback} />
                    </FormGroup>

                    <FormGroup>
                      <Button type="submit" color="primary" className="fw-semibold form-control shadow-sm rounded-pill">
                        Login
                      </Button>
                    </FormGroup>
                  </Form>
                )}
              </Formik>

              <Col md="12">
                <p className="text-center fw-semibold mt-3">or sign up with</p>

                <Button color="primary" className="fw-semibold form-control shadow-sm rounded-pill">
                  <i className="fa-brands fa-google pe-2"></i>Login with Google
                </Button>
                <div className="mt-2 mb-4">
                  <p className="fw-semibold">
                    Don't have an account?
                    <Link to="#" className="ps-2 text-decoration-none fw-semibold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
