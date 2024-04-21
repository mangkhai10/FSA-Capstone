import { useState, useEffect } from 'react';

const API = "https://fsa-capstone.onrender.com/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
        try {
          const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
          const headers = {
            "Content-Type": "application/json",
          };
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
          const response = await fetch(`${API}/cartitems`, {
            method: 'GET',
            headers: headers
          });
          if (response.ok) {
            const cartItemsData = await response.json();
            console.log('Cart items data:', cartItemsData); // Log the fetched cart items
            setCartItems(cartItemsData);
          } else {
            console.error('Failed to fetch cart items');
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };
      
      
  
    fetchCartItems();
  }, []);
  

  // Function to remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${API}/cartitems/${productId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // Remove the item from the cart locally
        const updatedCart = cartItems.filter(item => item.product_id !== productId);
        setCartItems(updatedCart);
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Function to calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map(cartItems => (
            <div key={cartItems.product_id}>
              <p>Name: {cartItems.character_name}</p>
              <p>Quantity: {cartItems.quantity}</p>
              <p>Price: {cartItems.price}</p>
              <p>Total: {cartItems.quantity * cartItems.price}</p>
              <button onClick={() => removeFromCart(cartItems.product_id)}>Remove</button>
            </div>
          ))}
          <p>Total: {calculateTotal()}</p>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
