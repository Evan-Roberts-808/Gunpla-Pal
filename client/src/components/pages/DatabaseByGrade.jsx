import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Pagination } from "react-bootstrap";
import { FaClipboardList, FaHeart } from "react-icons/fa";

const DatabaseByGrade = () => {
  const { grade } = useParams();
  const [gunplas, setGunplas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gunplasPerRow = 6;
  const rowsPerPage = 4;
  const pageLimit = 2;

  // SEARCH STATE
  const [search, setSearch] = useState("");

  // HANDLE SEARCH
  function handleSearch(e) {
    setSearch(e.target.value);
    setCurrentPage(1);
  }

  // SEARCHED GUNDAMS ARRAY
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
                  <button onClick={() => addToWishlist(gunpla.id)}>
                    <FaHeart className="feature-icon wishlist" />
                    Wishlist
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

  let gradeDescription;

  if (grade.toUpperCase() === "HG") {
    gradeDescription = (
      <p>
        Experience the perfect balance between affordability and detail
        with High Grade (HG) Gunplas. These 1/144 scale models offer a
        great entry point into the world of Gunpla, featuring impressive
        articulation, vibrant color schemes, and an extensive lineup of
        popular Mobile Suits. Whether you're a beginner or a seasoned
        builder, HG Gunplas provide an enjoyable building experience and
        display-worthy results.
      </p>
    );
  } else if (grade.toUpperCase() === "RG") {
    gradeDescription = (
      <p>
        Immerse yourself in the ultimate level of realism with Real
        Grade (RG) Gunplas. These 1/144 scale models combine intricate
        detailing, advanced engineering, and precise part separation to
        deliver an unparalleled level of authenticity. From the
        intricate panel lines to the stunning articulation, RG Gunplas
        bring your favorite Mobile Suits to life like never before,
        making them a must-have for collectors and enthusiasts alike.
      </p>
    );
  } else if (grade.toUpperCase() === "MG") {
    gradeDescription = (
      <p>
        Elevate your Gunpla experience with Master Grade (MG) models. At
        1/100 scale, these highly detailed kits offer an impressive
        level of complexity and craftsmanship. MG Gunplas feature a
        multitude of accessories, intricate inner frames, and
        exceptional articulation, allowing you to recreate dynamic poses
        and capture the essence of the original Mobile Suit. With their
        attention to detail and extensive customization options, MG
        Gunplas provide an immersive building experience for enthusiasts
        seeking the pinnacle of Gunpla engineering.
      </p>
    );
  } else if (grade.toUpperCase() === "SD") {
    gradeDescription = (
      <p>
        Embrace the adorable side of Gunpla with Super Deformed (SD)
        kits. These chibi-style models offer a unique and playful take
        on your favorite Mobile Suits. SD Gunplas are characterized by
        their exaggerated proportions and cute expressions, making them
        a delightful addition to any collection. Despite their compact
        size, SD kits provide an enjoyable building experience and often
        feature articulation and interchangeable parts, allowing you to
        create various poses and expressions for endless fun.
      </p>
    );
  } else if (grade.toUpperCase() === "PG") {
    gradeDescription = (
      <p>
        Prepare for the ultimate Gunpla masterpiece with Perfect Grade
        (PG) models. These 1/60 scale kits redefine what it means to
        build a Gunpla, offering an unprecedented level of detail, size,
        and complexity. PG Gunplas feature intricate inner frames,
        extensive surface detail, LED lighting systems, and a vast array
        of accessories. Every aspect is meticulously crafted to
        replicate the Mobile Suit with breathtaking precision. For those
        seeking the most immersive and awe-inspiring Gunpla experience,
        Perfect Grade models are the pinnacle of perfection.
      </p>
    );
  } else if (grade.toUpperCase() === "FG") {
    gradeDescription = (
      <p>
        Dive into the world of fun and creativity with the First Grade
        (FG) Gunplas. These entry-level kits are designed for young builders or
        those who want a simple building experience. FG Gunplas offer snap-fit
        assembly, minimal parts, and colorful designs that capture the essence
        of popular Mobile Suits. With their affordability and ease of
        construction, FG Gunplas are perfect for beginners and fans of all ages
        to start their Gunpla journey.
      </p>
    );
  } else if (grade.toUpperCase() === "NG") {
    gradeDescription = (
      <p>
        Discover the roots of Gunpla with the No Grade (NG) models.
        These kits offer a simplified building experience, perfect for beginners
        or those looking for a quick and easy build. While they may have fewer
        details compared to other grades, NG Gunplas still capture the essence
        of the Mobile Suits and provide a great entry point into the world of
        Gunpla.
      </p>
    );
  } else if (grade.toUpperCase() === "AG") {
    gradeDescription = (
      <p>
        Experience the next level of Gunpla building with the AG models.
        These kits offer an advanced building experience, perfect for builders
        looking to challenge their skills and creativity. With a focus on
        intricate details and enhanced articulation, AG Gunplas provide a
        rewarding and immersive building journey. Step up to the Advanced Grade
        and unlock new possibilities in the world of Gunpla.
      </p>
    );
  } else if (grade.toUpperCase() === "EG") {
    gradeDescription = (
      <p>
        Experience the Extra Grade (EG) Gunplas, designed for advanced
        builders and collectors seeking the utmost level of detail and
        craftsmanship. These high-end kits feature intricate designs,
        exceptional articulation, and premium materials to recreate the Mobile
        Suits with unparalleled realism. EG Gunplas often include a wide range
        of accessories, intricate decals, and advanced building techniques,
        allowing you to create stunning and dynamic displays. With their
        exquisite quality and attention to detail, EG Gunplas are the pinnacle
        of Gunpla artistry, satisfying the most discerning enthusiasts.
      </p>
    );
  } else if (grade.toUpperCase() === "EX") {
    gradeDescription = (
      <p>
        Dive into the world of Extended Grade (EX) Gunplas and push the
        boundaries of customization and creativity. These kits offer an
        extensive range of interchangeable parts, allowing you to create unique
        and personalized Mobile Suits. From specialized equipment to alternate
        configurations, EX Gunplas provide endless possibilities for
        customization and imaginative builds. Unleash your creativity and take
        your Gunpla collection to the next level with the versatility of the
        Extended Grade.
      </p>
    );
  } else if (grade.toUpperCase() === "LM") {
    gradeDescription = (
      <p>
        Embark on a journey of nostalgia with Legacy Master Grade (LM)
        Gunplas. These kits pay tribute to iconic Mobile Suits from the past,
        capturing the essence of classic Gundam series and memorable designs. LM
        Gunplas feature modern engineering techniques and enhanced articulation,
        allowing you to recreate the beloved Mobile Suits with improved detail
        and poseability. Whether you're a long-time fan or discovering the rich
        history of Gundam, LM Gunplas offer a nostalgic building experience and
        a chance to relive the legendary moments of the franchise.
      </p>
    );
  } else if (grade.toUpperCase() === "MEGA") {
    gradeDescription = (
      <p>
        Prepare for an epic building experience with MEGA Grade (MEGA)
        Gunplas. These larger-than-life kits deliver an awe-inspiring display
        with their massive size and exceptional detail. MEGA Gunplas showcase
        the most iconic and powerful Mobile Suits from the Gundam universe,
        capturing their imposing presence and intricate features. With their
        impressive scale and extensive parts, MEGA kits offer a rewarding
        challenge for experienced builders, allowing you to create a centerpiece
        that commands attention. Dive into the world of MEGA Grade and unleash
        the full might of your favorite Mobile Suits.
      </p>
    );
  } else if (grade.toUpperCase() === "HIRM") {
    gradeDescription = (
      <p>
        Experience the pinnacle of Gunpla craftsmanship with High
        Resolution Model (HiRM) kits. These masterpieces combine meticulous
        detailing, exquisite engineering, and premium materials to deliver an
        unrivaled level of realism and quality. HiRM Gunplas are designed to
        replicate the iconic Mobile Suits with astonishing precision, featuring
        intricately molded parts, advanced articulation, and a wealth of
        accessories. These 1/100 scale models offer an immersive building
        experience, allowing you to bring your favorite Mobile Suits to life in
        stunning detail. Immerse yourself in the world of HiRM and witness the
        breathtaking fusion of artistry and engineering.
      </p>
    );
  } else if (grade.toUpperCase() === "MGSD") {
    gradeDescription = (
      <p>
        Experience the pinnacle of Gunpla craftsmanship with High
        Resolution Model (HiRM) kits. These masterpieces combine meticulous
        detailing, exquisite engineering, and premium materials to deliver an
        unrivaled level of realism and quality. HiRM Gunplas are designed to
        replicate the iconic Mobile Suits with astonishing precision, featuring
        intricately molded parts, advanced articulation, and a wealth of
        accessories. These 1/100 scale models offer an immersive building
        experience, allowing you to bring your favorite Mobile Suits to life in
        stunning detail. Immerse yourself in the world of HiRM and witness the
        breathtaking fusion of artistry and engineering.
      </p>
    );
  } else if (grade.toUpperCase() === "SGC") {
    gradeDescription = (
      <p>
        Embark on a premium Gunpla experience with Super Grade Composite
        (SGC) kits. These high-end models fuse the craftsmanship of Master Grade
        (MG) Gunplas with additional features and enhancements. SGC Gunplas
        showcase exceptional detail, intricate mechanical designs, and a wide
        range of articulation, allowing you to recreate dynamic poses and
        capture the essence of the Mobile Suits. With their premium materials,
        extensive customization options, and impeccable engineering, SGC kits
        provide an immersive and satisfying building experience for advanced
        builders and collectors. Elevate your Gunpla collection to new heights
        with the unmatched quality and sophistication of SGC Gunplas.
      </p>
    );
  } else if (grade === "FullMechanics") {
    gradeDescription = (
      <p>
        Dive into the world of intricate mechanical designs with
        FullMechanics Gunpla kits. These models offer an elevated building
        experience, combining the scale and detail of Master Grade (MG) Gunplas
        with a focus on the internal mechanics of the Mobile Suits.
        FullMechanics kits feature exposed inner frames, intricate joint
        systems, and a wide array of mechanical components, allowing you to
        explore the inner workings of your favorite Mobile Suits. With their
        attention to mechanical detail and the ability to display both the inner
        frame and the armor, FullMechanics Gunplas provide a unique and visually
        stunning addition to any Gunpla collection. Unleash your curiosity and
        showcase the complexity of Mobile Suit engineering with FullMechanics.
      </p>
    );
  } else if (grade === "RE-100") {
    gradeDescription = (
      <p>
        Unleash your creativity with the Reborn-One Hundred (RE/100) line.
        These 1/100 scale models feature a high level of detail and
        articulation, rivaling the Master Grade (MG) series. RE/100 Gunplas
        often include unique designs and Mobile Suits from various Gundam
        series. With their larger size and intricate parts, RE/100 kits offer a
        rewarding building experience for intermediate to advanced builders.
        Dive into the world of RE/100 Gunplas and bring your favorite Mobile
        Suits to life with their impressive presence and exceptional detail.
        From iconic designs to lesser-known gems, RE/100 kits provide a canvas
        for your modeling skills and a chance to explore the vast universe of
        Gundam. Let your imagination soar and create masterpieces with RE/100
        Gunplas.
      </p>
    );
  } else if (grade === "HY2M") {
    gradeDescription = (
      <p>
        Immerse yourself in the world of HY2M, where hyper hybrid models
        bring a new level of realism to your Gundam collection. HY2M kits offer
        an extraordinary blend of detailed plastic parts and die-cast metal
        components, resulting in stunning models that exude strength and
        authenticity. These 1/100 scale masterpieces showcase exceptional
        craftsmanship and meticulous attention to detail, capturing the essence
        of the Mobile Suits with unparalleled precision. HY2M Gunplas stand out
        with their robust construction, solid weight, and dynamic poses, making
        them a must-have for collectors seeking the ultimate Gundam experience.
        Delve into the realm of HY2M and witness the harmonious fusion of
        plastic and metal, creating masterful works of art that embody the
        spirit of Gundam. Elevate your collection with HY2M and let your passion
        for Mobile Suits reach new heights.
      </p>
    );
  }

  return (
    <Container>
      <h2>Gunpla Database - Grade: {grade}</h2>
      {gradeDescription}
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
    </Container>
  );
};

export default DatabaseByGrade;
