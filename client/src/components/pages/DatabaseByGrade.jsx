import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Card} from 'react-bootstrap'

const DatabaseByGrade = () => {
  const { grade } = useParams();
  const [gunplas, setGunplas] = useState([])

  useEffect(() => {
    fetch(`/api/gunplas/${grade}`)
    .then((response) => response.json())
    .then((data) => setGunplas(data))
    .catch((error) => {
      console.log(error)
    });
  }, [grade])
  
  const gunplaDisplay = gunplas.map((gunpla) => {
    return (
      <Card className="col-sm-2" key={gunpla.id}>
        <Card.Img src={gunpla.model_img}></Card.Img>
        <Card.Body>
          <Card.Text>{gunpla.model_num}</Card.Text>
          <Card.Text>{gunpla.model}</Card.Text>
          <Card.Text>{gunpla.series}</Card.Text>
          <Card.Text>{gunpla.release_date}</Card.Text>
          <Card.Text>{gunpla.notes}</Card.Text>
          <button>Add to collection</button>
          <button>Add to wishlist</button>
        </Card.Body>
      </Card>
    )
  })

  return (
    <div>
      <h2>Gunpla Database - Grade: {grade}</h2>
      <section className="row">
        {gunplaDisplay}
      </section>
    </div>
  )
}

export default DatabaseByGrade
