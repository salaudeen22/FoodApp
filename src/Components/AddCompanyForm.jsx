import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

function AddCompanyForm() {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/addCompany', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
   
      Swal.fire({
        title: "Added Successfully!",
        text: "The company has been added.",
        icon: "success"
      });

   
      setFormData({
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
    } catch (error) {
      console.error('Error adding company:', error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue adding the company.",
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
            required
          />
        </Form.Group>

        <Button variant="primary mt-4" type="submit">
          Add Restaurant
        </Button>
      </Form>
    </Container>
  );
}

export default AddCompanyForm;
