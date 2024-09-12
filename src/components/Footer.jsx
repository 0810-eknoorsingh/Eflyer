import React from "react";
import logo from "../assets/logo.png";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-5 bg-dark text-white">
      <div className="container text-center">
        <img src={logo} alt="Footer-Logo" />

        <form className="d-flex justify-content-center align-items-center mt-3 mb-4">
          <input
            type="email"
            className="form-control w-50"
            placeholder="Your Email"
            aria-label="Your Email"
          />
          <button className="btn btn-warning ms-3" type="submit">
            SUBSCRIBE
          </button>
        </form>

        <ul className="list-inline">
          <li className="list-inline-item mx-3">
            <a href="#" className="text-white">
              Best Sellers
            </a>
          </li>
          <li className="list-inline-item mx-3">
            <a href="#" className="text-white">
              Gift Ideas
            </a>
          </li>
          <li className="list-inline-item mx-3">
            <a href="#" className="text-white">
              New Releases
            </a>
          </li>
          <li className="list-inline-item mx-3">
            <a href="#" className="text-white">
              Today's Deals
            </a>
          </li>
          <li className="list-inline-item mx-3">
            <a href="#" className="text-white">
              Customer Service
            </a>
          </li>
        </ul>

        <p className="mt-4">
          Help Line Number:{" "}
          <a href="" className="text-white">
            +1 1800 1200 1200
          </a>
        </p>

        <p className="text-muted mt-3">
          &copy; 2024 All Rights Reserved. Designed by Eknoor Singh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
