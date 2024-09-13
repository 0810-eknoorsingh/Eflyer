import React, { useState } from "react";
import "../styles/Navbar.css";
import backgroundImage from "../assets/banner-bg.png";
import logo from "../assets/logo.png";
import uk from "../assets/flag-uk.png";
import france from "../assets/flag-france.png";
import {
  Container,
  Button,
  Form,
  FormControl,
  Dropdown,
  Carousel,
  Navbar as BootstrapNavbar,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLoginClick = () => {
    navigate("/adminPanel");
  };

  return (
    <>
      <div className="background-image-wrapper">
        <img
          src={backgroundImage}
          alt="Background"
          className="background-image"
        />
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </div>
      <div className="navbar-wrapper">
        <BootstrapNavbar
          expand="lg"
          className="custom-navbar"
          expanded={expanded}
          onToggle={(expanded) => setExpanded(expanded)}
        >
          <Container fluid className="navbar-container">
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto navbar-list">
                <Nav.Link href="#home">Best Sellers</Nav.Link>
                <Nav.Link href="#about">Gift Ideas</Nav.Link>
                <Nav.Link href="#services">New Releases</Nav.Link>
                <Nav.Link href="#contact">Today's Deals</Nav.Link>
                <Nav.Link href="#contact">Customer Service</Nav.Link>
              </Nav>
            </BootstrapNavbar.Collapse>
          </Container>
        </BootstrapNavbar>
        <Container>
          <div className="looking-wrapper d-flex flex-wrap justify-content-between align-items-center mt-3">
            <Button
              variant="outline-secondary"
              className="custom-icon-button d-lg-none"
            >
              <i className="bi bi-list"></i>
            </Button>
            <Dropdown className="ml-2 mb-2 mb-md-0">
              <Dropdown.Toggle
                className="custom-dropdown-toggle"
                variant="outline-dark"
              >
                All Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/1">Action</Dropdown.Item>
                <Dropdown.Item href="#action/2">Another action</Dropdown.Item>
                <Dropdown.Item href="#action/3">
                  Something else here
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form className="d-flex flex-grow-1 mx-2 mb-2 mb-md-0">
              <FormControl
                type="text"
                placeholder="Search this Blog"
                className="mr-2 flex-grow-1"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  width: "70%",
                }}
              />
              <Button className="search-button" variant="outline-success">
                <i className="bi bi-search" style={{ color: "white" }}></i>
              </Button>
            </Form>
            <Dropdown className="ml-2 mb-2 mb-md-0">
              <Dropdown.Toggle
                className="custom-dropdown-toggle1"
                variant="outline-dark"
              >
                <img src={uk} alt="UK Flag" className="ukimage" />
                &nbsp; English
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/1">
                  <img src={france} alt="France Flag" className="ukimage" />
                  &nbsp; French
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div>
              <Button className="custom-text-button mb-2 mb-md-0">
                <i
                  className="bi bi-cart-fill"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                CART
              </Button>
              <Button
                className="custom-text-button ml-2"
                onClick={handleLoginClick}
              >
                <i
                  className="bi bi-person-fill"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                LOGIN
              </Button>
            </div>
          </div>
        </Container>
        <Container className="carousel-container">
          <Carousel indicators={false}>
            <Carousel.Item interval={1000}>
              <div className="carousel-content">
                <h3 className="slidertext">
                  GET START
                  <br />
                  YOUR FAVORITE SHOPPING
                </h3>
                <Button variant="primary">BUY NOW</Button>
              </div>
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <div className="carousel-content">
                <h3 className="slidertext">
                  GET START
                  <br />
                  YOUR FAVORITE SHOPPING
                </h3>
                <Button variant="primary">BUY NOW</Button>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-content">
                <h3 className="slidertext">
                  GET START
                  <br />
                  YOUR FAVORITE SHOPPING
                </h3>
                <Button variant="primary">BUY NOW</Button>
              </div>
            </Carousel.Item>
          </Carousel>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
