import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const API = "https://fsa-capstone.onrender.com/api";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`${API}/products/${productId}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        });
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching single product:', error);
      }
    };
  
    fetchSingleProduct();
  }, [productId]);
  
  const handleAddToCart = async () => {
    try {
      const response = await fetch(`${API}/cartitems`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity
        })
      });
  
      if (response.ok) {
        console.log('Product added to cart:', product);
        const updatedStockQuantity = product.stock_quantity - quantity;
        setProduct({ ...product, stock_quantity: updatedStockQuantity });
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  

  const handleQuantityChange = (newQuantity) => {
    setQuantity(isNaN(newQuantity) || newQuantity === '' ? '' : parseInt(newQuantity));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <div>
        <img src={product.image_url} alt={product.name} />
        <div>Name: {product.character_name}</div>
        <div>Series: {product.series}</div>
        <div>Price: {product.price}</div>
        <div>Stock Quantity: {product.stock_quantity}</div>
        <div>Category: {product.category}</div>
        <div>Description: {product.description}</div>
        <input type="number" value={quantity} onChange={(e) => handleQuantityChange(e.target.value)} />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;
