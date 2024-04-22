import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  // State for user details and payment method
  const [userDetails, setUserDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Fetch user details and payment method
    fetchUserDetails();
  }, []);

  // Function to fetch user details
  const fetchUserDetails = async () => {
    try {
      // Make API call to fetch user details
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: localStorage.getItem('token') // Assuming token is stored in localStorage
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUserDetails(userData);
        setAddress(userData.address); // Set address in state
        setPaymentMethod(userData.payment_method); // Set payment method in state
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Function to handle adding a payment method
  const handleAddPaymentMethod = () => {
    // Implement your logic to add a payment method here
    // This could involve opening a payment method form or redirecting to a payment page
    // Once payment method is added, update state accordingly
    setPaymentMethod('Credit Card'); // Example: Setting payment method to 'Credit Card'
  };

  // Function to handle placing the order
  const handlePlaceOrder = async () => {
    try {
      // Make API call to place the order
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') // Assuming token is stored in localStorage
        },
        body: JSON.stringify({
          total_amount: 100, // Example: Total amount of the order
          address: address,
          payment_method: paymentMethod
        })
      });
      if (response.ok) {
        // Order placed successfully
        console.log('Order placed successfully');
        // You can redirect to a confirmation page or display a success message
      } else {
        console.error('Failed to place the order');
      }
    } catch (error) {
      console.error('Error placing the order:', error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        {/* Display user details */}
        <p>Name: {userDetails.first_name} {userDetails.last_name}</p>
        <p>Email: {userDetails.email}</p>
        <p>Address: {address}</p>
      </div>
      <div>
        {/* Display product attributes */}
        {/* Implement your logic to display product attributes here */}
      </div>
      {/* Display payment method */}
      {paymentMethod ? (
        <p>Payment method: {paymentMethod}</p>
      ) : (
        <button onClick={handleAddPaymentMethod}>Add Payment Method</button>
      )}
      {/* Display place order button */}
      {paymentMethod && (
        <button onClick={handlePlaceOrder}>Place Order</button>
      )}
      {/* Link to go back to cart */}
      <Link to="/cart">
        <button>Back to Cart</button>
      </Link>
    </div>
  );
};

export default Checkout;
