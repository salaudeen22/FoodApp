import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";
import AddCompanyForm from "../Components/AddCompanyForm";
import UpdateCompanyForm from "../Components/UpdateCompanyForm";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [updateShowModal, setUpdateShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setUpdateShowModal(false);
    setSelectedCompany(null);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/allCompanies");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleRowClick = (company) => {
    setSelectedCompany(company);
    setUpdateShowModal(true);
  };

  return (
    <div>
      <Navbar expand="lg" bg="success">
        <Navbar.Brand as={Link} to="#" className="fs-4 fst-italic">
          HackFood
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
      </Navbar>
      <div
        className="d-flex justify-content-end mt-2"
        style={{ zIndex: 9, position: "relative" }}
      >
        <Button
          variant="success"
          className="text-white mx-1"
          onClick={handleShow}
        >
          Add Company
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Restaurant Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCompanyForm />
        </Modal.Body>
      </Modal>

      <Modal show={updateShowModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Restaurant Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCompany && <UpdateCompanyForm company={selectedCompany} />}
        </Modal.Body>
      </Modal>

      <div className="table-container">
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr
                key={company._id}
                onClick={() => handleRowClick(company)}
                className="table-row"
              >
                <td>{company.name}</td>
                <td>{company.address}</td>
                <td>{company.phone}</td>
                <td>{company.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AdminDashboard;
