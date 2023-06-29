import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Container, Image, Card } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [activeSection, setActiveSection] = useState('collection');
  const [viewWishlist, setViewWishlist] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [userWishlists, setUserWishlists] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showSkillLevelForm, setShowSkillLevelForm] = useState(false);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');

  const navigate = useNavigate();

  const initialValues = {
    bio: '',
  };

  const initialSkillLevelValues = {
    skill_level: '',
  };

  const validationSchema = Yup.object({
    bio: Yup.string().required('Please fill out your bio'),
  });

  const skillLevelValidationSchema = Yup.object({
    skill_level: Yup.string().required('Please select a skill level'),
  });

  const handleSubmit = (values) => {
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
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setSelectedSkillLevel(values); // Update the selected skill level
      });
  };

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
          console.log(data);
          setUserWishlists(data);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  const switchView = (section) => {
    setActiveSection(section);
  };

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
          <div className="row mb-3" key={collection.id}>
            <div className="col">
              <Card>
                <div className="row g-0">
                  <div className="col-sm-3 d-flex align-items-center">
                    <Card.Img src={collection.gunpla.model_img} className="mx-auto" />
                  </div>
                  <div className="col-sm-8 align-items-center">
                    <div className="card-body">
                      <h5 className="card-title">{collection.gunpla.model}</h5>
                      <p className="card-text">{collection.gunpla.series}</p>
                      <p className="card-text">{collection.gunpla.release_date}</p>
                      <p className="card-text text-truncate">{collection.gunpla.notes}</p>
                      <button
                        className="collection-button"
                        onClick={() => handleCollectionDelete(collection.gunpla.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
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
          <div className="row mb-3" key={wishlist.id}>
            <div className="col">
              <Card>
                <div className="row g-0">
                  <div className="col-sm-3 d-flex align-items-center">
                    <Card.Img src={wishlist.gunpla.model_img} className="mx-auto" />
                  </div>
                  <div className="col-sm-8 align-items-center">
                    <div className="card-body">
                      <h5 className="card-title">{wishlist.gunpla.model}</h5>
                      <p className="card-text">{wishlist.gunpla.series}</p>
                      <p className="card-text">{wishlist.gunpla.release_date}</p>
                      <p className="card-text text-truncate">{wishlist.gunpla.notes}</p>
                      <button
                        className="wishlist-button"
                        onClick={() => handleWishlistDelete(wishlist.gunpla.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </Row>
    );
  };

  const renderSkillLevelStars = () => {
    if (user.skill_level === 'Beginner') {
      return <span>⭐</span>;
    } else if (user.skill_level === 'Intermediate') {
      return <span>⭐⭐</span>;
    } else if (user.skill_level === 'Advanced') {
      return <span>⭐⭐⭐</span>;
    } else {
      return null;
    }
  };

  return (
    <Container>
      {user ? (
        <>
          <Row>
            <Col md={4}>
              <Image src={user.profile_pic} alt="profile_picture" className="profile-pic" roundedCircle />
            </Col>
            <Col md={8}>
              <h2>{user.username}</h2>
              <p>Member since: {user.created_at}</p>
              {showSkillLevelForm ? (
                    <Formik
                      initialValues={initialSkillLevelValues}
                      validationSchema={skillLevelValidationSchema}
                      onSubmit={handleSkillLevelSubmit}
                    >
                      <Form>
                        <div>
                          <label htmlFor="skill_level">Skill Level:</label>
                          <Field as="select" name="skill_level" id="skill_level">
                            <option value="">Select skill level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </Field>
                          <ErrorMessage name="skill_level" component="div" />
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
              {!edit ? (
                <p>
                  Bio: {user.bio}
                  <button onClick={() => handleEditSwitch()}>Edit Bio</button>
                </p>
                
              ) : (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div>
                      <Field type="text" name="bio" id="bio" />
                      <ErrorMessage name="bio" component="div" />
                    </div>
                    <button type="submit">Submit</button>
                  </Form>
                </Formik>
              )}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={2} style={{ order: activeSection === 'collection' ? 1 : 2 }} className="section-button">
              <h2
                className={activeSection === 'collection' ? 'collection-section active' : 'collection-section'}
                onClick={() => switchView('collection')}
              >
                Collection
              </h2>
            </Col>
            <Col md={2} style={{ order: activeSection === 'collection' ? 2 : 1 }} className="section-button">
              <h2
                className={activeSection === 'wishlist' ? 'wishlist-section active' : 'wishlist-section'}
                onClick={() => switchView('wishlist')}
              >
                Wishlist
              </h2>
            </Col>
          </Row>
          <hr />
          <div>{activeSection === 'collection' ? renderCollections() : renderWishlists()}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default Profile;
