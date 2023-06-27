import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DatabaseByGrade = () => {
  const { grade } = useParams();
  const [gunplas, setGunplas] = useState([])

  console.log(grade)

  useEffect(() => {
    fetch(`/api/gunplas/${grade}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error)
    });
  }, [grade])
  

  return (
    <div>
      <h2>Gunpla Database - Grade: {grade}</h2>
      <ul>
        {gunplas.map((gunpla) => (
          <li key={gunpla.id}>{gunpla.model}</li>
        ))}
      </ul>
    </div>
  )
}

export default DatabaseByGrade
