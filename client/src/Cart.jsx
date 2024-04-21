import React, { useState, useEffect } from 'react';

const API = "https://fsa-capstone.onrender.com/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items from local storage or session storage
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);

    // Calculate total price
    const price = storedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    setTotalPrice(price);
  }, []);

  // Function to update quantity of an item in the cart
  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch(`${API}/cartitems/${productId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      if (response.ok) {
        const updatedCartItems = cartItems.map(item => {
          if (item.productId === productId) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        const price = updatedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        setTotalPrice(price);
      } else {
        console.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Function to remove an item from the cart
  const removeItem = async (productId) => {
    try {
      const response = await fetch(`${API}/cartitems/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedCartItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        const price = updatedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        setTotalPrice(price);
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Function to proceed to checkout
  const handleCheckout = () => {
    // Implement checkout process
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.productId}>
            <div>{item.productName}</div>
            <div>Quantity: 
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
              />
            </div>
            <div>Price: ${item.price * item.quantity}</div>
            <button onClick={() => removeItem(item.productId)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>Total Price: ${totalPrice}</div>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
