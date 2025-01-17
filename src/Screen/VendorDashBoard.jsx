import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Nav, Navbar, Modal, Button, Table } from "react-bootstrap";
import AddFoodItem from "../Components/AddFoodItem";
import AddCategory from "../Components/AddCategory";

import FoodItemsList from "../Components/FoodItemList";

function VendorDashBoard() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  
  
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  const auth = localStorage.getItem("authtoken");
  const navigate = useNavigate();

  useEffect(() => {
    const company = localStorage.getItem("name");
    const userEmail=localStorage.getItem("userEmail");

  
    setCompanyName(company );
    setCompanyEmail(userEmail);


    

 
  }, []);



  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);


 
  return (
    <div>
         <Navbar expand="lg" bg="success" className="d-flex justify-content-lg-between">
      <Navbar.Brand as={Link} to="#" className="fs-4 fst-italic text-white">
        HackFood
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ml-auto">
          {!auth ? (
            <div className="d-flex flex-xl-row flex-md-column">
              <Link className="btn bg-white text-success mx-1 mt-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1 mt-1" to="/createuser">
                SignUp
              </Link>
            </div>
          ) : (
            <Button className="bg-white text-danger mx-2 mt-1" onClick={handleLogout}>
              LogOut
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>

      <div className="container mt-5 d-flex align-items-center justify-content-between">
        <h2 className="greeting text-success">Welcome, {companyName}!</h2>
        <div className="">
        <Button variant="success" className="mt-3" onClick={handleShow}>
          Add Category
        </Button>
        <Button variant="success" className="mx-1 mt-3" onClick={handleShow1}>
          Add Food Item
        </Button>
        </div>
      </div>

    <FoodItemsList/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <AddCategory/>
        </Modal.Body>
        <Modal.Footer>
      
         
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Add Food Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AddFoodItem/>
        </Modal.Body>
        
      </Modal>
    </div>
  );
}

export default VendorDashBoard;
