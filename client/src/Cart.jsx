import { useState, useEffect } from 'react';

const API = "https://fsa-capstone.onrender.com/api";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${API}/cartitems`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (response.ok) {
          const cartItemsData = await response.json();
          // Combine cart items with the same product
          const combinedCartItems = combineCartItems(cartItemsData);
          setProducts(combinedCartItems);
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
  const removeFromCart = async (cartItemId) => {
    try {
      const response = await fetch(`${API}/cartitems/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // Remove the deleted item from the products state
        const updatedProducts = products.filter(product => product.product_id !== cartItemId);
        setProducts(updatedProducts);
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Function to calculate total price
  const calculateTotal = () => {
    return products.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {products.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {products.map(product => (
            <div key={product.product_id}>
              <img src={product.image_url} alt={product.character_name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <p>Name: {product.character_name}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: {product.price}</p>
              <button onClick={() => removeFromCart(product.product_id)}>Remove</button>
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
