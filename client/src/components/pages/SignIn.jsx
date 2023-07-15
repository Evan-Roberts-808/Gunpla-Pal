import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    const userData = {
      ...values,
    };

    fetch("https://gunpla-pal.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        navigate("/database");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <img
            src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/b81929fca4087d492f6bd19531e83f5a1aefe30c/.github/images/general/SignIn.png"
            alt="signinimage"
            className="signup-image"
          />
        </Col>
        <Col md={8}>
          <Row>
            <Col>
              <h2>Sign In</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <Field
                      type="text"
                      name="username"
                      id="username"
                      className="form-control form-field"
                    />
                    <ErrorMessage name="username" component="div" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="form-control form-field"
                    />
                    <ErrorMessage name="password" component="div" />
                  </div>
                  <button type="submit" className="btn btn-primary signup-button">
                    Submit
                  </button>
                </Form>
              </Formik>
              <p>Don't have an account?<span style={{"cursor": "pointer", "marginLeft":"10px"}} onClick={() => navigate('/signup')}>Sign Up</span></p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;
