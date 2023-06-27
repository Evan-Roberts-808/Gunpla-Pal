import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DatabaseByGrade = () => {
  const { grade } = useParams();
  const [gunplas, setGunplas] = useState([])

  useEffect(() => {
    const fetchGunplasByGrade = async () => {
      try {
        const response = await fetch(`/api/gunplas/${grade}`) // CHANGE THIS
        const data = await response.json();
        setGunplas(data)
      } catch (error) {
        console.error('Error fetching gunplas by grade:', error)
      }
    };

    fetchGunplasByGrade()
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
