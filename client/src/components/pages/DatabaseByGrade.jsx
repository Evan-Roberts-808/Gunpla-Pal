import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

///***PAGINATION***///
const DatabaseByGrade = () => {
  const { grade } = useParams();
  const [gunplas, setGunplas] = useState([]);
  const [gunplasPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  // Functionality for React Bootstrap Pagination
  const indexOfLastGunpla = currentPage * gunplasPerPage;
  const indexOfFirstGunpla = indexOfLastGunpla - gunplasPerPage;
  const currentGunplas = gunplas.slice(
    indexOfFirstGunpla,
    indexOfLastGunpla
  );

const totalPages = Math.ceil(gunplas.length / gunplasPerPage);

function handlePageChange(pageNumber) {
  setCurrentPage(pageNumber);
}

function renderPageNumbers() {
  const pageNumbers = [];
  const limit = 3; // Number of page numbers to display before and after ellipsis

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  } else {
    if (currentPage <= limit + 1) {
      for (let i = 1; i <= limit + 2; i++) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
      pageNumbers.push(<Pagination.Ellipsis key="ellipsis1" />);
      pageNumbers.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    } else if (currentPage >= totalPages - limit) {
      pageNumbers.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          {1}
        </Pagination.Item>
      );
      pageNumbers.push(<Pagination.Ellipsis key="ellipsis2" />);
      for (let i = totalPages - (limit + 1); i <= totalPages; i++) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      pageNumbers.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          {1}
        </Pagination.Item>
      );
      pageNumbers.push(<Pagination.Ellipsis key="ellipsis3" />);
      for (
        let i = currentPage - limit;
        i <= currentPage + limit;
        i++
      ) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
      pageNumbers.push(<Pagination.Ellipsis key="ellipsis4" />);
      pageNumbers.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
  }

  return pageNumbers;
}


  useEffect(() => {
    fetch(`/api/gunplas/${grade}`)
      .then((response) => response.json())
      .then((data) => setGunplas(data))
      .catch((error) => {
        console.log(error);
      });
  }, [grade]);

  const gunplaDisplay = currentGunplas.map((gunpla) => {
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
    );
  });

  return (
    <div>
      <h2>Gunpla Database - Grade: {grade}</h2>
      <section className="row">{gunplaDisplay}</section>
      <Pagination>
          {renderPageNumbers()}
        </Pagination>
    </div>
  );
};

export default DatabaseByGrade;
