import React, { useState } from 'react';
import {Row, Col, Container} from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {

  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});


const handleSubmit = (values) => {

  const userData = {
    ...values,
  }

  // Send a POST request to create the user in the database
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      console.log(data);
    })
    .catch(error => console.error(error));
};


  return (
    <Container>
      <Row>
      <Col md={4}>
        <img src='https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/b81929fca4087d492f6bd19531e83f5a1aefe30c/.github/images/general/SignIn.png'/>
      </Col>
      <Col md={8}>
      <h2>Sign In</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
         <Form>
           <div>
             <label htmlFor="username">Username</label>
             <Field type="text" name="username" id="username" />
             <ErrorMessage name="username" component="div" />
           </div>
           <div>
             <label htmlFor="password">Password</label>
             <Field type="password" name="password" id="password" />
             <ErrorMessage name="password" component="div" />
           </div>
           <button type="submit">Submit</button>
         </Form>
       </Formik>
      </Col>
      </Row>
    </Container>
  )
}

export default Signup;

