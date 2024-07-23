import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/myorderdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Fetched order data:", responseData.order_data.order_data);
        setOrderData(responseData.order_data.order_data || []);
      } else {
        console.error("Failed to fetch order data");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">My Orders</h2>
        <div className="row">
          {orderData.length > 0 ? (
            orderData.map((order, orderIndex) => (
              <div key={orderIndex} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Order {orderIndex + 1}</h5>
                    {order.order_data.map((nestedOrderData, nestedOrderIndex) => (
                      <div key={nestedOrderIndex} className="mb-3">
                        <h6 className="card-subtitle mb-2 text-muted">{nestedOrderData.name}</h6>
                        <p className="card-text">Quantity: {nestedOrderData.qty}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info" role="alert">
                No orders available
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
