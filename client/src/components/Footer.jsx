import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="my-5">
      <footer
        className="text-center text-white"
        style={{ backgroundColor: "#3f51b5" }}
      >
        <div className="container">
          <section className="mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p>
                  GunplaPAL is a dedicated database and collection tracker for
                  Gunpla enthusiasts. Our platform provides a comprehensive
                  collection of Gunpla kits, making it easier for you to
                  explore, track, and manage your collection.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center mb-5">
            <a href="/" className="text-white me-4">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="/" className="text-white me-4">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 GunplaPAL. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
