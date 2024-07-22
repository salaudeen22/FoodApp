import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

function UpdateCompanyForm({ company, onUpdate, onDelete }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    cuisines: '',
    openingHours: '',
    password: '',
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        address: company.address || '',
        phone: company.phone || '',
        email: company.email || '',
        website: company.website || '',
        description: company.description || '',
        cuisines: company.cuisines || '',
        openingHours: company.openingHours || '',
        password: '',
      });
    }
  }, [company]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/updateCompany/${company._id}`, formData);
      if (onUpdate) onUpdate();
      Swal.fire({
        title: "Updated Successfully!",
        icon: "success"
      });
    } catch (error) {
      console.error("Error updating company:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating the company.",
        icon: "error"
      });
    }
  };

  const handleDelete = async () => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

      const result = await swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:4000/api/deleteCompany/${company._id}`);
        await swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        if (onDelete) onDelete(); 
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        await swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue deleting the company.",
        icon: "error"
      });
    }
  };

  return (
    <Container className="mt-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter restaurant name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formWebsite">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter website URL"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter a brief description of the restaurant"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formCuisines">
          <Form.Label>Cuisines</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter types of cuisines offered"
            name="cuisines"
            value={formData.cuisines}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formOpeningHours">
          <Form.Label>Opening Hours</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter opening hours (e.g., 9 AM - 10 PM)"
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary mt-4" type="submit">
          Update Restaurant
        </Button>
        <Button variant="danger mt-4 ms-2" onClick={handleDelete}>
          Delete Restaurant
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateCompanyForm;
