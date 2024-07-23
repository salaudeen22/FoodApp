import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/myorderdata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Fetched order data:', responseData.order_data.order_data);
        setOrderData(responseData.order_data.order_data || []);
      } else {
        console.error('Failed to fetch order data');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {orderData.length > 0 ? (
            orderData.map((order, orderIndex) => {
              console.log(`Order ${orderIndex}:`, order);
              return (
                <div key={orderIndex} className='order-details'>
                  <h3>Order ID: {order._id}</h3>
                  {order.order_data.map((nestedOrderData, nestedOrderIndex) => {
                    console.log(`Order ${orderIndex}, Nested Order ${nestedOrderIndex}:`, nestedOrderData);
                    return (
                      <div key={nestedOrderIndex}>
                        {Array.isArray(nestedOrderData) &&
                          nestedOrderData.map((item, itemIndex) => {
                            console.log(`Order ${orderIndex}, Nested Order ${nestedOrderIndex}, Item ${itemIndex}:`, item);
                            return (
                              <div key={itemIndex}>
                                <p>Name: {item.name}</p>
                                <p>Quantity: {item.qty}</p>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <p>No orders available</p>
          )}
        </div>
        </div>
      <Footer />
    </div>
  );
}
