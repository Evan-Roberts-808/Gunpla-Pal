import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Container, Image, Card } from 'react-bootstrap'
import { UserContext }  from '../../context/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext)
  const [viewWishlist, setViewWishlist] = useState(false)
  const [userDetails, setUserDetails] = useState({ collections: [] })

  useEffect(() => {

    if (user) {
      fetch(`/api/${user.username}/collections`)
        .then((response) => response.json())
        .then((data) => setUserDetails(data))
        .catch((error) => console.log(error));
    }
  }, [user]);

  console.log(userDetails)

  function switchView(){
    setViewWishlist(prev => !prev)
  }

  const collectionDisplay = userDetails.map((gunpla) => {
    return (
      <Card className="col-sm-2" key={gunpla.id}>
        <Card.Img src={gunpla.gunpla.model_img} />
        <Card.Body>
          <Card.Text>{gunpla.gunpla.model_num}</Card.Text>
          <Card.Text>{gunpla.gunpla.model}</Card.Text>
          <Card.Text>{gunpla.gunpla.series}</Card.Text>
          <Card.Text>{gunpla.gunpla.release_date}</Card.Text>
          <Card.Text>{gunpla.gunpla.notes}</Card.Text>
          {/* <button onClick={() => addToCollection(gunpla.id)}>Add to collection</button>
          <button onClick={() => addToWishlist(gunpla.id)}>Add to wishlist</button> */}
        </Card.Body>
      </Card>
    );
  });

  return (
    <Container>
      {user ? (
        <>
        <Row>
          <Col md={4}>
            <Image src={user.profile_pic} alt="profile_picture" roundedCircle/>
          </Col>
          <Col md={8}>
          <h2>User Profile: {user.username}</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          </Col>
        </Row>
        <hr />
        <Row>
        <h2 onClick={() => switchView()}>Collection</h2>
        <h2 onClick={() => switchView()}>Wishlist</h2>
        </Row>
        <hr/>
        {collectionDisplay}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  )
}

export default Profile