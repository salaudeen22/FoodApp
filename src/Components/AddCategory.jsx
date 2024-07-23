import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const auth = localStorage.getItem("authtoken");
  const companyEmail = localStorage.getItem("userEmail");

  const handleAddCategory = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/addCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify({ name: categoryName, companyEmail }),
      });

      const json = await response.json();
      if (response.ok) {
        alert("Category added successfully!");
        setCategoryName("");
      } else {
        alert("Failed to add category: " + json.error);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category");
    }
  };

  return (
    <Form>
      <Form.Group controlId="formCategoryName">
        <Form.Label>Category Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </Form.Group>
      <Button variant="success mt-2" onClick={handleAddCategory}>
        Add Category
      </Button>
    </Form>
  );
}

export default AddCategory;
