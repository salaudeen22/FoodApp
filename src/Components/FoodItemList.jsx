import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

function FoodItemsList() {
  const [foodItems, setFoodItems] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const userEmail=localStorage.getItem("userEmail");
  useEffect(() => {
    const fetchFoodItems = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/company/foodItems?email=${userEmail}`);
          if (!response.ok) {
            throw new Error("Failed to fetch food items");
          }
          const data = await response.json();
         
          setFoodItems(data);
        } catch (error) {
          console.error("Error fetching food items:", error);
        }
      };
  
      fetchFoodItems();
  }, []);

  const handleShowEditModal = (item) => {
    setSelectedFoodItem(item);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedFoodItem(null);
  };

  const handleUpdateFoodItem = async () => {
    try {
      const auth = localStorage.getItem("authtoken");
      const response = await fetch(`http://localhost:4000/api/updateFoodItem/${selectedFoodItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(selectedFoodItem),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Food item updated successfully!");
        handleCloseEditModal();
    
        const updatedResponse = await fetch("http://localhost:4000/api/allFoodItems"); 
        const updatedData = await updatedResponse.json();
        setFoodItems(updatedData);
      } else {
        alert("Failed to update food item: " + data.error);
      }
    } catch (error) {
      console.error("Error updating food item:", error);
      alert("Error updating food item");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Food Items</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Half Option</th>
            <th>Full Option</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.length > 0 ? (
            foodItems.map((item) => (
              <tr key={item._id} onClick={() => handleShowEditModal(item)} style={{ cursor: "pointer" }}>
                <td>{item.name}</td>
                <td>{item.options[0]?.half}</td>
                <td>{item.options[0]?.full}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No food items available</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Food Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFoodItem && (
            <Form>
              <Form.Group controlId="formFoodItemName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedFoodItem.name}
                  onChange={(e) => setSelectedFoodItem({ ...selectedFoodItem, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formFoodItemImg">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedFoodItem.img}
                  onChange={(e) => setSelectedFoodItem({ ...selectedFoodItem, img: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formFoodItemOptionsHalf">
                <Form.Label>Half Option</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedFoodItem.options[0]?.half || ""}
                  onChange={(e) => setSelectedFoodItem({
                    ...selectedFoodItem,
                    options: [{ ...selectedFoodItem.options[0], half: parseFloat(e.target.value) }],
                  })}
                />
              </Form.Group>
              <Form.Group controlId="formFoodItemOptionsFull">
                <Form.Label>Full Option</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedFoodItem.options[0]?.full || ""}
                  onChange={(e) => setSelectedFoodItem({
                    ...selectedFoodItem,
                    options: [{ ...selectedFoodItem.options[0], full: parseFloat(e.target.value) }],
                  })}
                />
              </Form.Group>
              <Form.Group controlId="formFoodItemDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedFoodItem.description}
                  onChange={(e) => setSelectedFoodItem({ ...selectedFoodItem, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formFoodItemCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedFoodItem.category}
                  onChange={(e) => setSelectedFoodItem({ ...selectedFoodItem, category: e.target.value })}
                />
              </Form.Group>
              <Button variant="primary" className="mt-3" onClick={handleUpdateFoodItem}>
                Update Food Item
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FoodItemsList;