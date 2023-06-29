import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Container } from "react-bootstrap";
import { UserContext } from "../../context/UserContext"

const Database = () => {
  const [gunplas, setGunplas] = useState([]);
  const {user} = useContext(UserContext)
  console.log(user)
  return (
    <Container>
      <h2>Gunpla Database</h2>
      <Row>
      <Col sm={3}>
      <Link to='/database/HG'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/HG.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/RG'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/RG.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/MG'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/MG.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/PG'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/PG.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/FG'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/FG.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/NG'>
          <Card className="grade-card"> 
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/NG.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/EG'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/EG.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/AG'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/AG.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/EX'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/EX.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/LM'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/LM.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/Mega'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/Mega.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/HiRM'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/HIRM.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/MGSD'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/MGSD.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/SGC'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/SGC.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/Full Mechanics'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/Full-Mechanics.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/RE-100'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/re-100.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        <Col sm={3}>
        <Link to='/database/HY2M'>
          <Card className="grade-card">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/HY2M.png"></Card.Img>
          </Card>
        </Link>
        </Col>
        </Row>
    </Container>
  );
};

export default Database;
