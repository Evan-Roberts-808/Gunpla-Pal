import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Pagination } from "react-bootstrap";
import { FaClipboardList, FaHeart } from "react-icons/fa";
import CommentModal from "../CommentModal.jsx";

const DatabaseByGrade = () => {
  const { grade } = useParams();
  const [gunplas, setGunplas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedGunpla, setSelectedGunpla] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const gunplasPerRow = 6;
  const rowsPerPage = 4;
  const pageLimit = 2;

  const showAlert = (message) => {
    setAlertMessage(message);
    alert(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  const handleGunplaClick = (gunpla) => {
    setSelectedGunpla(gunpla);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [search, setSearch] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value);
    setCurrentPage(1);
  }

  const searchedGunplas = [...gunplas].filter((el) => {
    const searchedNameMatch = el.model
      .toLowerCase()
      .includes(search.toLowerCase());

    const searchedSeriesMatch =
      el.series && el.series.toLowerCase().includes(search.toLowerCase());

    return searchedNameMatch || searchedSeriesMatch;
  });

  const gunplasPerPage = gunplasPerRow * rowsPerPage;
  const indexOfLastGunpla = currentPage * gunplasPerPage;
  const indexOfFirstGunpla = indexOfLastGunpla - gunplasPerPage;
  const currentGunplas = searchedGunplas.slice(
    indexOfFirstGunpla,
    indexOfLastGunpla
  );

  useEffect(() => {
    fetch(`/api/gunplas/${grade}`)
      .then((response) => response.json())
      .then((data) => setGunplas(data))
      .catch((error) => {
        console.log(error);
      });
  }, [grade]);

  const addToCollection = (gunpla_id) => {
    fetch("/api/collections/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gunpla_id: gunpla_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        showAlert("Gundam was added to the collection");
        console.log("Added to collection", data);
      })
      .catch((error) => {
        console.error("Error adding to collection", error);
      });
  };

  const addToWishlist = (gunpla_id) => {
    fetch("/api/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gunpla_id: gunpla_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        showAlert("Gundam was added to the wishlist");
        console.log("Added to wishlist", data);
      })
      .catch((error) => {
        console.error("Error adding to wishlist", error);
      });
  };

  const gunplaDisplay = currentGunplas.map((gunpla) => {
    return (
      <div className="row mb-3" key={gunpla.id}>
        <div className="col">
          <Card>
            <div className="row g-0">
              <div className="col-sm-3 d-flex align-items-center">
                <Card.Img src={gunpla.model_img} className="mx-auto" />
              </div>
              <div className="col-sm-8 align-items-center">
                <div className="card-body">
                  <h5 className="card-title">{gunpla.model}</h5>
                  <p className="card-text">{gunpla.series}</p>
                  <p className="card-text">{gunpla.release_date}</p>
                  <p className="card-text text-truncate">{gunpla.notes}</p>
                  <button
                    className="collection-button"
                    onClick={() => addToCollection(gunpla.id)}
                  >
                    <FaClipboardList className="feature-icon collection" />
                    Collection
                  </button>
                  <button
                    onClick={() => addToWishlist(gunpla.id)}
                    className="collection-button"
                  >
                    <FaHeart className="feature-icon wishlist" />
                    Wishlist
                  </button>
                  <button onClick={() => handleGunplaClick(gunpla)}>
                    View Comments
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(gunplas.length / gunplasPerPage);
  const pageNumbers = [];

  if (totalPages <= 1) {
    // No need to display pagination if there is only one page
    return (
      <Container>
        <section className="row">{gunplaDisplay}</section>
      </Container>
    );
  }

  if (currentPage <= pageLimit + 1) {
    for (let i = 1; i <= Math.min(totalPages, pageLimit * 2 + 1); i++) {
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
    if (totalPages > pageLimit * 2 + 1) {
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
    }
  } else if (currentPage >= totalPages - pageLimit) {
    pageNumbers.push(
      <Pagination.Item
        key={1}
        active={1 === currentPage}
        onClick={() => handlePageChange(1)}
      >
        {1}
      </Pagination.Item>
    );
    if (totalPages > pageLimit * 2 + 1) {
      pageNumbers.push(<Pagination.Ellipsis key="ellipsis1" />);
    }
    for (
      let i = Math.max(1, totalPages - pageLimit * 2);
      i <= totalPages;
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
    if (totalPages > pageLimit * 2 + 1) {
      pageNumbers.push(<Pagination.Ellipsis key="ellipsis1" />);
    }
    for (let i = currentPage - pageLimit; i <= currentPage + pageLimit; i++) {
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
    if (totalPages > pageLimit * 2 + 1) {
      pageNumbers.push(<Pagination.Ellipsis key="ellipsis2" />);
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

  return (
    <Container>
      <h2>Gunpla Database - Grade: {grade}</h2>
      <input
        type="text"
        placeholder="Search by model name or series..."
        onChange={(e) => handleSearch(e)}
      ></input>
      <div className="row justify-content-center model-row">
        {gunplaDisplay}
      </div>
      <div className="pagination-container d-flex justify-content-center">
        <Pagination>
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {pageNumbers}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
      <CommentModal
        selectedGunpla={selectedGunpla}
        showModal={showModal}
        onCloseModal={handleCloseModal}
      />
    </Container>
  );
};

export default DatabaseByGrade;
