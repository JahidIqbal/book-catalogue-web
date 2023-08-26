import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-5 mt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>About Us</h4>
            <p>
              We are dedicated to providing you with the best reading experience
              and a wide selection of books to choose from.
            </p>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <p>Email: contact@bookstore.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div className="col-md-4">
            <h4>Follow Us</h4>
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link to="/" className="text-white text-decoration-none">
                  Facebook
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/" className="text-white text-decoration-none">
                  Twitter
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/" className="text-white text-decoration-none">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <p className="text-center">
          &copy; 2023 Bookstore.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
