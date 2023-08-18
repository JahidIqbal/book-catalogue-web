import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase"; // Update the import path as needed
import { User } from "firebase/auth"; // Import the User type from firebase/auth

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Use the User type

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarExample01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" aria-current="page" to="/allbooks">
                  All Books
                </Link>
              </li>
              {user ? (
                <li className="nav-item">
                  <Link className="nav-link inline-element d-inline-block align-top " to="/addnewbook">
                    <button className="nav-link ">
                      Add new Book
                    </button>
                  </Link>
                  <button
                    className="nav-link inline-element d-inline-block align-top my-2"
                    onClick={() => auth.signOut()}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
