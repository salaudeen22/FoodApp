import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function AddFoodItem() {
  const [foodItemName, setFoodItemName] = useState("");
  const [foodItemImg, setFoodItemImg] = useState("");
  const [halfOption, setHalfOption] = useState("");
  const [fullOption, setFullOption] = useState("");
  const [foodItemDescription, setFoodItemDescription] = useState("");
  
  const [categoryName, setCategoryName] = useState("");  
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/allCategories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    

   
    const selectedCategory = categories.find(cat => cat._id === selectedCategoryId);
    if (selectedCategory) {
      setCategoryName(selectedCategory.name);
    } else {
      setCategoryName(""); 
    }
  };

  const handleAddFoodItem = async () => {
    try {
      const auth = localStorage.getItem("authtoken");
      const response = await fetch("http://localhost:4000/api/addFoodItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify({
          name: foodItemName,
          img: foodItemImg,
          options: [{ half: parseFloat(halfOption), full: parseFloat(fullOption) }],
          description: foodItemDescription,
         
          category:categoryName, 
          companyEmail:localStorage.getItem("userEmail")
                }),
      });

      const json = await response.json();
      if (response.ok) {
        alert("Food item added successfully!");
        setFoodItemName("");
        setFoodItemImg("");
        setHalfOption("");
        setFullOption("");
        setFoodItemDescription("");
       
        setCategoryName(""); 
      } else {
        alert("Failed to add food item: " + json.error);
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      alert("Error adding food item");
    }
  };

  return (
    <Form>
      <Form.Group controlId="formFoodItemName">
        <Form.Label>Food Item Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter food item name"
          value={foodItemName}
          onChange={(e) => setFoodItemName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formFoodItemImg">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={foodItemImg}
          onChange={(e) => setFoodItemImg(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formFoodItemOptionsHalf">
        <Form.Label>Half Option</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter half option price"
          value={halfOption}
          onChange={(e) => setHalfOption(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formFoodItemOptionsFull">
        <Form.Label>Full Option</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter full option price"
          value={fullOption}
          onChange={(e) => setFullOption(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formFoodItemDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter food item description"
          value={foodItemDescription}
          onChange={(e) => setFoodItemDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formFoodItemCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
         
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="success mt-2" onClick={handleAddFoodItem}>
        Add Food Item
      </Button>
    </Form>
  );
}

export default AddFoodItem;
