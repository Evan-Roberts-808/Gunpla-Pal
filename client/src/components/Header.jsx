import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Nav, Navbar, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header({ darkMode, updateDarkMode }) {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await fetch("https://gunpla-pal.onrender.com/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              className="logo"
              src={
                darkMode
                  ? "https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/b3d6aaa3e197ca5f44ddd9fc3709dd049176e789/.github/images/logos/Logo-Dark.svg"
                  : "https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/b3d6aaa3e197ca5f44ddd9fc3709dd049176e789/.github/images/logos/Logo-Light.svg"
              }
              alt="Logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="custom-header justify-content-end"
            style={{ width: "100%" }}
          >
            {user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/database"
                  className={darkMode ? "dark-link" : "light-link"}
                >
                  Database
                </Nav.Link>
                <Image
                  className="nav-prof-pic"
                  src={user.profile_pic}
                  roundedCircle
                />
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className={darkMode ? "dark-link" : "light-link"}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/"
                  className={darkMode ? "dark-link" : "light-link"}
                  onClick={handleLogout}
                >
                  Sign Out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/database"
                  className={darkMode ? "dark-link" : "light-link"}
                >
                  Database
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  className={darkMode ? "dark-link" : "light-link"}
                >
                  Sign Up
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className={darkMode ? "dark-link" : "light-link"}
                >
                  Login
                </Nav.Link>
              </>
            )}
            <div
              id="toggle"
              onClick={updateDarkMode}
              className={darkMode ? "active" : ""}
            >
              <i className="indicator"></i>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
