import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-4 fst-italic" to="#">
          HackFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link active fs-5" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            {localStorage.getItem("authtoken") ? (
              <li className="nav-item ">
                <Link className="nav-link active fs-5" to="/">
                  My orders
                </Link>
              </li>
            ) : (
              " "
            )}
          </ul>
          {!localStorage.getItem("authtoken") ? (
            <div className="d-flex ">
              <Link className="btn bg-white text-success  mx-1" to="/login">
                Login
              </Link>

              <Link
                className="btn bg-white text-success  mx-1"
                to="/createuser"
              >
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              <div className="btn btn bg-white text-success mx-2">My Cart</div>
              <div
                className="btn btn bg-white text-danger mx-2"
                onClick={handleLogout}
              >
                LogOut
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
