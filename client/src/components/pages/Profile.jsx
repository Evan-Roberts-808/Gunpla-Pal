import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Container, Image, Card } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [viewWishlist, setViewWishlist] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [userWishlists, setUserWishlists] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showSkillLevelForm, setShowSkillLevelForm] = useState(false);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');
  const [collectedGunplasByGrade, setCollectedGunplasByGrade] = useState([]);


  const navigate = useNavigate();

  const initialValues = {
    bio: '',
    instagramLink: ''
  };

  const initialSkillLevelValues = {
    skillLevel: '',
  };

  const validationSchema = Yup.object({
    bio: Yup.string().required('Please fill out your bio'),
    instagramLink: Yup.string().url('Invalid Instagram link')
  });

  const skillLevelValidationSchema = Yup.object({
    skillLevel: Yup.string().required('Please select a skill level'),
  });

  const handleSubmit = (values) => {
    console.log(values);
    fetch(`/api/users/${user.username}/bio`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((resp) => resp.json())
      .then((data) => {
        handleEditSwitch();
      });
  };

  const handleSkillLevelSubmit = (values) => {
    fetch(`/api/users/${user.username}/skill_level`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setSelectedSkillLevel(values.skillLevel); // Update the selected skill level
      });
  };

  useEffect(() => {
    if (user) {
      const fetchCollectedGunplasByGrade = () => {
        fetch(`/api/users/${user.username}/collections_by_grade`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch collected Gunplas by grade');
            }
          })
          .then((data) => {
            setCollectedGunplasByGrade(data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
      fetchCollectedGunplasByGrade();
    }
  }, [user]);
  
  

  useEffect(() => {
    if (user) {
      fetch(`/api/${user.username}/collections`)
        .then((response) => response.json())
        .then((data) => {
          setUserDetails(data); // Assuming the response data is in the correct format
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetch(`/api/${user.username}/wishlists`)
        .then((response) => response.json())
        .then((data) => {
          setUserWishlists(data);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  const handleEditSwitch = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  const handleCollectionDelete = (gunpla_id) => {
    fetch('/api/collections/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gunpla_id: gunpla_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails((prevState) =>
          prevState.filter((collection) => collection.gunpla.id !== gunpla_id)
        );
      });
  };

  const renderCollections = () => {
    if (!userDetails || userDetails.length === 0) {
      return <p>No collections found.</p>;
    }

    return (
      <Row>
        {userDetails.map((collection) => (
          <Col sm={2} key={collection.id}>
            <Card>
              <Card.Img variant="top" src={collection.gunpla?.model_img} />
              <Card.Body>
                <Card.Title>{collection.gunpla?.model_num}</Card.Title>
                <Card.Text>{collection.gunpla?.model}</Card.Text>
                <Card.Text>{collection.gunpla?.series}</Card.Text>
                <Card.Text>{collection.gunpla?.release_date}</Card.Text>
                <Card.Text>{collection.gunpla?.notes}</Card.Text>
                <button onClick={() => handleCollectionDelete(collection.gunpla.id)}>Delete</button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const handleWishlistDelete = (gunpla_id) => {
    fetch('/api/wishlist/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gunpla_id: gunpla_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserWishlists((prevState) =>
          prevState.filter((wishlist) => wishlist.gunpla.id !== gunpla_id)
        );
      });
  };

  const renderWishlists = () => {
    if (!userWishlists || userWishlists.length === 0) {
      return <p>No wishlists found. </p>;
    }

    return (
      <Row>
        {userWishlists.map((wishlist) => (
          <Col sm={2} key={wishlist.id}>
            <Card>
              <Card.Img variant="top" src={wishlist.gunpla?.model_img} />
              <Card.Body>
                <Card.Title>{wishlist.gunpla?.model_num}</Card.Title>
                <Card.Text>{wishlist.gunpla?.model}</Card.Text>
                <Card.Text>{wishlist.gunpla?.series}</Card.Text>
                <Card.Text>{wishlist.gunpla?.release_date}</Card.Text>
                <Card.Text>{wishlist.gunpla?.notes}</Card.Text>
                <button onClick={() => handleWishlistDelete(wishlist.gunpla.id)}>Delete</button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const renderSkillLevelStars = () => {
    if (selectedSkillLevel === 'Beginner') {
      return <span>🥉</span>;
    } else if (selectedSkillLevel === 'Intermediate') {
      return <span>🥈</span>;
    } else if (selectedSkillLevel === 'Advanced') {
      return <span>🥇</span>;
    } else {
      return null;
    }
  };

  const renderStats = () => {
    // Calculate and render user's stats
    const totalGunplas = userDetails.length; // Total number of collected Gunplas
    const totalGunplasByGrade = {}; // Object to store the count of Gunplas by grade
  
    // Count the Gunplas by grade
    collectedGunplasByGrade.forEach((gunpla) => {
      const grade = gunpla.grade;
      if (grade in totalGunplasByGrade) {
        totalGunplasByGrade[grade]++;
      } else {
        totalGunplasByGrade[grade] = 1;
      }
    });
  
    return (
      <div>
        <h4>Stats</h4>
        <p>Total Gunplas Collected: {totalGunplas}</p>
        <h5>Gunplas Collected/Built by Grade:</h5>
        <ul>
          {Object.entries(totalGunplasByGrade).map(([grade, count]) => (
            <li key={grade}>
              {grade}: {count}
            </li>
          ))}
        </ul>
        <p>Total Wishlisted Items: {userWishlists.length}</p>
      </div>
    );
  }  


  return (
    <Container>
      {user ? (
        <>
          <Row>
            <Col md={4}>
              <Image src={user.profile_pic} alt="profile_picture" roundedCircle />
            </Col>
            <Col md={8}>
              <h2>User Profile: {user.username}</h2>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              {!edit ? (
                <>
                  <p>
                    Bio: {user.bio}
                    <button onClick={handleEditSwitch}>Edit Bio</button>
                  </p>
                  <p>
                    Instagram: {user.instagramLink}
                    <button onClick={handleEditSwitch}>Edit Instagram Link</button>
                  </p>
                  {showSkillLevelForm ? (
                    <Formik
                      initialValues={initialSkillLevelValues}
                      validationSchema={skillLevelValidationSchema}
                      onSubmit={handleSkillLevelSubmit}
                    >
                      <Form>
                        <div>
                          <label htmlFor="skillLevel">Skill Level:</label>
                          <Field as="select" name="skillLevel" id="skillLevel">
                            <option value="">Select skill level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </Field>
                          <ErrorMessage name="skillLevel" component="div" />
                        </div>
                        <button type="submit">Submit</button>
                      </Form>
                    </Formik>
                  ) : (
                    <>
                      <div>
                        Skill Level: {renderSkillLevelStars()}
                      </div>
                      <button onClick={() => setShowSkillLevelForm(true)}>Update Skill Level</button>
                    </>
                  )}
                </>
              ) : (
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  <Form>
                    <div>
                      <Field type="text" name="bio" id="bio" />
                      <ErrorMessage name="bio" component="div" />
                    </div>
                    <div>
                      <Field type="text" name="instagramLink" id="instagramLink" />
                      <ErrorMessage name="instagramLink" component="div" />
                    </div>
                    <button type="submit">Submit</button>
                  </Form>
                </Formik>
              )}
            </Col>
          </Row>
          <hr />
          {renderStats()}
          <h4>Collections</h4>
          {renderCollections()}
          <h4>Wishlists</h4>
          {renderWishlists()}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};
export default Profile;