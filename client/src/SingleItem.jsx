import { useState, useEffect } from 'react';

const API = "https://fsa-capstone.onrender.com/api";

const SingleItem = ({ productId }) => {
  const [itemDetails, setItemDetails] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`${API}/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch item details");
        }
        const itemData = await response.json();
        setItemDetails(itemData);
      } catch (error) {
        console.error("Error fetching item details:", error.message);
      }
    };

    fetchItemDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await fetch(`${API}/cartitems`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity
        })
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div>
      <h1>Item Details</h1>
      <img src={itemDetails.image_url} alt={itemDetails.name} style={{ maxWidth: '200px', maxHeight: '200px' }} />
      <div>Name: {itemDetails.name}</div>
      <div>Description: {itemDetails.description}</div>
      <div>Price: {itemDetails.price}</div>
      <div>Stock Quantity: {itemDetails.stock_quantity}</div>
      <div>Category: {itemDetails.category}</div>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default SingleItem;
