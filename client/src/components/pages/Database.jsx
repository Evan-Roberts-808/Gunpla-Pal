import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";

const Database = () => {
  const [gunplas, setGunplas] = useState([]);

  // useEffect(() => {
  //   const fetchGunplas = async () => {
  //     try {
  //       const response = await fetch('/api/gunplas'); // CHANGE THIS
  //       const data = await response.json();
  //       setGunplas(data);
  //     } catch (error) {
  //       console.error('Error fetching gunplas:', error);
  //     }
  //   };

  //   fetchGunplas();
  // }, []);

  return (
    <div>
      <h2>Gunpla Database</h2>
      <div className='row'>
      <Link to='/database/HG'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/HG.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/RG'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/RG.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/MG'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/MG.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/PG'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/PG.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/FG'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/FG.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/NG'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/NG.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/EG'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/EG.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/AG'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/AG.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/EX'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/EX.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/LM'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/LM.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/Mega'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/Mega.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/HiRM'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/HiRM.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/MGSD'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/MGSD.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/SGC'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/SGC.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/FullMechanics'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/FullMechanics.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/RE-100'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/RE-100.png"></Card.Img>
          </Card>
        </Link>
        <Link to='/database/HY2M'>
          <Card className="col-sm-2">
            <Card.Img src="https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/grades/HY2M.png"></Card.Img>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Database;
