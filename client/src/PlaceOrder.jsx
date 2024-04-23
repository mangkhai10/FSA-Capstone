import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api";

const PlaceOrder = ({ token }) => {
  const [userDetails, setUserDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState('');
  const [missingFieldMessage, setMissingFieldMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchUserDetails();
    fetchCartItems();
  }, [token]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${API}/auth/me`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUserDetails(userData);
        setAddress(userData.address);
        setPaymentMethod(userData.payment_method);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${API}/cartitems`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      if (response.ok) {
        const cartData = await response.json();
        const combinedCartItems = combineCartItems(cartData); // Combine cart items here
        setCartItems(combinedCartItems);
        calculateTotal(combinedCartItems); // Calculate total amount with combined cart items
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const combineCartItems = (cartItemsData) => {
    const combinedCartItems = [];
    cartItemsData.forEach(item => {
      const existingItemIndex = combinedCartItems.findIndex(cartItem => cartItem.product_id === item.product_id);
      if (existingItemIndex !== -1) {
        combinedCartItems[existingItemIndex].quantity += item.quantity;
      } else {
        combinedCartItems.push(item);
      }
    });
    return combinedCartItems;
  };

  const handlePlaceOrder = async () => {
    if (!address || !paymentMethod) {
      setMissingFieldMessage('Either the address or payment method is missing.');
      return;
    }
    try {
      const response = await fetch(`${API}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
          total_amount: totalAmount,
          address: address,
          payment_method: paymentMethod
        })
      });
      if (response.ok) {
        console.log('Order placed successfully');
        setSuccess('Order placed successfully');
  
        // Clear cart items after placing the order
        await fetch(`${API}/cartitems`, {
          method: 'DELETE',
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
  
        const orderData = await response.json();
        const order = orderData.id;
        window.location.href = `/order/${order}`;
        setCartItems([]);
        setTotalAmount(0);
        setError('');
        setMissingFieldMessage('');
      } else {
        console.error('Failed to place the order');
      }
    } catch (error) {
      console.error('Error placing the order:', error);
    }
  };
  
  const calculateTotal = (cartData) => {
    const total = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalAmount(total);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <p>Name: {userDetails.first_name} {userDetails.last_name}</p>
        <p>Email: {userDetails.email}</p>
        <div>
          <p>Address: {userDetails.address}</p>
          <p>Payment Method: {userDetails.payment_method}</p>
        </div>
        {cartItems.map(item => (
          <div key={item.cart_id}>
            <img src={item.image_url} alt={item.character_name} style={{ width: '100px', height: '100px' }} />
            <p>Name: {item.character_name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
      <p>Total Amount: ${totalAmount}</p>
      <button
        onClick={handlePlaceOrder}
        disabled={!address || !paymentMethod}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          cursor: !address || !paymentMethod ? 'not-allowed' : 'pointer'
        }}
      >
        {isHovered && (!address || !paymentMethod) ? 'Address or payment method missing' : 'Place Order'}
        {(!address || !paymentMethod) && <span> (Address or payment method missing)</span>}
      </button>
      {(!address || !paymentMethod) && <p className="error">{missingFieldMessage}</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <Link to="/cart">
        <button>Back to Cart</button>
      </Link>
    </div>
  );
};

export default PlaceOrder;
