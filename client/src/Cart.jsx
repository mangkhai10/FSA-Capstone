import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api";

const Cart = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    setIsLoggedIn(!!token);
    
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${API}/cartitems`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
          }
        });
        if (response.ok) {
          const cartItemsData = await response.json();
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
  }, [token]);

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

  const removeFromCart = async (cart_id) => {
    try {
      const response = await fetch(`${API}/cartitems/${cart_id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
      });
      if (response.ok) {
        const updatedProducts = products.filter(product => product.cart_id !== cart_id);
        setProducts(updatedProducts);
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const calculateTotal = () => {
    return products.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {products.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {products.map(product => (
            <div key={product.cart_id}>
              <Link to={`/product/${product.product_id}`}>
                <img src={product.image_url} alt={product.character_name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </Link>
              <div>
                <p>Name: {product.character_name}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: {product.price}</p>
                <button onClick={() => removeFromCart(product.cart_id)}>Remove</button>
              </div>
            </div>
          ))}
          <p>Total: {calculateTotal()}</p>
          {isLoggedIn ? (
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
          ) : (
            <Link to="/register">
              <button>Register to Checkout</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
