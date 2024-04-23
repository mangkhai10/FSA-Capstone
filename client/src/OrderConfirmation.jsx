import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api";

const OrderConfirmation = ({ token }) => {
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    fetchOrderDetails();
  }, [token]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${API}/order/${orderId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        },
      });
      if (response.ok) {
        const orderData = await response.json();
        setOrderDetails(orderData);
        setLoading(false);
      } else {
        console.error('Failed to fetch order details. Server responded with status:', response.status);
        setError('Failed to fetch order details');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Error fetching order details');
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Order Confirmation</h2>
      <div key={orderDetails.id}>
        <p>Order ID: {orderDetails.id}</p>
        <p>Total Amount: ${orderDetails.total_amount}</p>
        <p>Payment Method: {orderDetails.payment_method}</p>
        <p>Order Date: {new Date(orderDetails.order_date).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
