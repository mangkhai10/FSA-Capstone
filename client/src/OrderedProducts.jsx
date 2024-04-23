import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api";

const OrderedProducts = ( {token}) => {
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const { orderId } = useParams();

  useEffect(() => {
    fetchOrderDetails(); // Corrected function name
  }, [token]);

  const fetchOrderDetails = async () => { // Corrected function name
    try {
      const response = await fetch(`${API}/order`, {
        method: 'GET',
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
        setError('Failed to fetch order details');
        setLoading(false); // Set loading to false to stop loading indicator
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Error fetching order details');
      setLoading(false); // Set loading to false to stop loading indicator
    }
  };

  console.log("orderId:", orderId); // Log orderId to check if it's fetched correctly

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
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

export default OrderedProducts;
