import React, { useState } from 'react';
import {Row, Col, Container} from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {

  const defaultProfilePics = [
    'https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/Amuro.png',
    'https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/Char.png',
    'https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/Haman.png',
    'https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/RX78.png',
    'https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/Sayla.png',
    'https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/profile_pics/Suletta.png'
  ]

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});


const handleSubmit = (values) => {

  const randomIndex = Math.floor(Math.random() * defaultProfilePics.length)
  const profilePic = defaultProfilePics[randomIndex]

  const userData = {
    ...values,
    profile_pic: profilePic
  }

  // Send a POST request to create the user in the database
  fetch('/api/signup', {
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
      <h2>Signup</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
         <Form>
          <div>
             <label htmlFor="name">Name</label>
             <Field type="text" name="name" id="name" />
             <ErrorMessage name="name" component="div" />
           </div>
           <div>
             <label htmlFor="email">Email</label>
             <Field type="text" name="email" id="email" />
             <ErrorMessage name="email" component="div" />
           </div>
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

           <div>
             <label htmlFor="confirmPassword">Confirm Password</label>
             <Field type="password" name="confirmPassword" id="confirmPassword" />
             <ErrorMessage name="confirmPassword" component="div" />
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

