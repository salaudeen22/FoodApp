import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [addCompany,setaddCompany]=useState(false);
  const handleClick=()=>
  {

  }
  return (
    <div>
      <Navbar expand="lg" bg="success">
        <Navbar.Brand as={Link} to="#" className="fs-4 fst-italic">
          HackFood
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />

        {/* <Navbar.Collapse id="navbarNav">
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

      
    </Navbar.Collapse> */}
      </Navbar>
      <div className="mt-2">
        <div className="btn btn bg-success text-black mx-1" onClick={handleClick}>Add Company</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
