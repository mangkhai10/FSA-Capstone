import { useState, useEffect } from 'react';

const API = "https://fsa-capstone.onrender.com/api";

const OrderedProducts = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API}/order`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      if (!response.ok) { // Corrected the condition here
        throw new Error('Failed to fetch orders');
      }
      
      // Check if response body is empty
      const text = await response.text();
      if (!text) {
        // Handle empty response
        setOrders([]);
        setLoading(false);
        return;
      }
      
      const ordersData = await response.json();
      setOrders(ordersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error fetching orders');
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
      <h2>All Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderedProducts;
