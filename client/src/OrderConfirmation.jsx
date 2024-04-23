import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api";

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${API}/orders/${orderId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      if (response.ok) {
        const orderData = await response.json();
        setOrderDetails(orderData);
        setLoading(false);
      } else {
        console.error('Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Order ID: {orderDetails.id}</p>
      <p>Total Amount: ${orderDetails.total_amount}</p>
      <p>Payment Method: {orderDetails.payment_method}</p>
      <p>Order Date: {new Date(orderDetails.order_date).toLocaleString()}</p>
    </div>
  );
};

export default OrderConfirmation;
