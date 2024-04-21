import { useState, useEffect } from 'react';

const API = "https://fsa-capstone.onrender.com/api";

export const SingleProduct = ({ productId }) => {
  const [product, setProduct] = useState(null);

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <div>
        <img src={product.image_url} alt={product.name} />
        <div>Name: {product.name}</div>
        <div>Series: {product.series}</div>
        <div>Price: {product.price}</div>
        <div>Stock Quantity: {product.stock_quantity}</div>
        <div>Category: {product.category}</div>
        <div>Description: {product.description}</div>
      </div>
    </div>
  );
};
