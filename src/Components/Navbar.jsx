import Model from "../Model";
import Cart from "../Components/Cart";
import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";
// import logo from "../Assessts/assesst/images-removebg-preview.png";

function NavBar() {
  let data = useCart();
  const cartItemCount = data ? data.length : 0;
  const navigate = useNavigate();
  const [CartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };

  return (
    <div>
      <Navbar expand="lg" bg="success">
        <Navbar.Brand as={Link} to="#" className="fs-1 fst-italic">
        HackFood
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto mb-2">
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="fs-5">
                Home
              </Nav.Link>
            </Nav.Item>

            {localStorage.getItem("authtoken") && (
              <Nav.Item>
                <Nav.Link as={Link} to="/myOrder" className="fs-5">
                  My orders
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>

          {!localStorage.getItem("authtoken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>

              <Link className="btn bg-white text-success mx-1" to="/createuser">
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn btn bg-white text-success mx-2"
                onClick={() => setCartView(true)}
              >
                My Cart{" "}
                <Badge pill bg="danger">
                  {cartItemCount}
                </Badge>
              </div>

              {CartView && (
                <Model onClose={() => setCartView(false)}>
                  <Cart />
                </Model>
              )}
              <div
                className="btn btn bg-white text-danger mx-2"
                onClick={handleLogout}
              >
                LogOut
              </div>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
