import { useState, useEffect } from 'react';

const API = "https://fsa-capstone.onrender.com/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
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
          // Combine cart items with the same product
          const combinedCartItems = combineCartItems(cartItemsData);
          setCartItems(combinedCartItems);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  // Function to combine cart items with the same product
  const combineCartItems = (cartItemsData) => {
    const combinedCartItems = [];
    cartItemsData.forEach(item => {
      const existingItemIndex = combinedCartItems.findIndex(cartItem => cartItem.product_id === item.product_id);
      if (existingItemIndex !== -1) {
        // If item already exists in the combined cart, increase its quantity
        combinedCartItems[existingItemIndex].quantity += item.quantity;
      } else {
        // If item doesn't exist in the combined cart, add it
        combinedCartItems.push(item);
      }
    });
    return combinedCartItems;
  };

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
          {cartItems.map(cartItem => (
            <div key={cartItem.cartItemId}>
              <img src={cartItem.image_url} alt={cartItem.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <p>Name: {cartItem.name}</p>
              <p>Quantity: {cartItem.quantity}</p>
              <p>Price: {cartItem.price}</p>
              <button onClick={() => removeFromCart(cartItem.product_id)}>Remove</button>
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
