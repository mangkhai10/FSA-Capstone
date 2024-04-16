import { useState, useEffect } from 'react';

const API = "https://fsa-capstone.onrender.com/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API}/products`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setProducts(result);
      setFilteredProducts(result); // Initialize filtered products with all products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = async (productId) => {
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
      // Refresh product data after adding to cart
      fetchProducts();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(product =>
      product.category.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search by category..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filteredProducts.map(product => (
          <li key={product.product_id}>
            <div>Name: {product.name}</div>
            <div>Description: {product.description}</div>
            <div>Price: {product.price}</div>
            <div>Stock Quantity: {product.stock_quantity}</div>
            <div>Category: {product.category}</div>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button onClick={() => handleAddToCart(product.product_id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
