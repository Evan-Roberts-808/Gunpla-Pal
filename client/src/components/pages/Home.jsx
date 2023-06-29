import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaDatabase, FaClipboardList, FaHeart } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <Container>
          <h2>Welcome to GunplaPAL!</h2>
          <p>Explore our database + manage your collections & wishlists.</p>
          </Container>
      </div>
      <Container>
        <Row>
        <Col md={4}>
          <div className="feature-box text-center">
            <FaDatabase className="feature-icon" />
            <h3>Extensive Database</h3>
            <p>Discover a vast collection of Gunpla kits, including grades, series, release dates, and more.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-box text-center">
            <FaClipboardList className="feature-icon" />
            <h3>Manage Collections</h3>
            <p>Effortlessly organize and track your Gunpla collection, complete with detailed information and images.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-box text-center">
            <FaHeart className="feature-icon" />
            <h3>Create Wishlists</h3>
            <p>Keep track of Gunpla kits you desire by creating personalized wishlists with notes and images.</p>
          </div>
        </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
