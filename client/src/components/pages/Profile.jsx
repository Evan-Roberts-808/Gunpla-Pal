import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Container, Image, Card } from 'react-bootstrap'
import { UserContext }  from '../../context/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext)
  const [viewWishlist, setViewWishlist] = useState(false)
  const [userDetails, setUserDetails] = useState([])
  const [userWishlists, setUserWishlists] = useState([])


  // console.log(user)
  useEffect(() => {
    if (user) {
      fetch(`/api/${user.username}/collections`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
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
        console.log(data)
        setUserWishlists(data)
      })
      .catch((error) => console.log(error))
    }
  }, [user])

  // console.log(userWishlists)
  console.log(userDetails)

  function switchView(){
    setViewWishlist(prev => !prev)
  }


const handleCollectionDelete = (gunpla_id) => {
  fetch("/api/collections/remove", {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "gunpla_id": gunpla_id
    })
  })
  .then((response) => response.json())
  .then((data) => {
    setUserDetails((prevState) => (prevState.filter((collection)=> collection.gunpla.id !== gunpla_id)))
  })
}

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
    fetch("/api/wishlist/remove", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "gunpla_id": gunpla_id
      })
    })
    .then((response) => response.json())
    .then((data) => {
      setUserWishlists((prevState) => (prevState.filter((wishlist)=> wishlist.gunpla.id !== gunpla_id)))
    })
  }

  const renderWishlists = () => {
    if (!userWishlists || userWishlists.length === 0) {
      return <p>No wishlists found. </p>
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
    )
  }


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
        <div>{renderCollections()}</div>
        <div>{renderWishlists()}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  )
}

export default Profile