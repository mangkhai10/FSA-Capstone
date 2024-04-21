import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantityMap, setQuantityMap] = useState({});


  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API}/products`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setProducts(result);
      setFilteredProducts(result);
      initializeQuantityMap(result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const initializeQuantityMap = (products) => {
    const initialQuantityMap = {};
    products.forEach(product => {
      initialQuantityMap[product.product_id] = 1;
    });
    setQuantityMap(initialQuantityMap);
  };
  
  const handleAddToCart = async (productId) => {
    try {
      const quantityToAdd = quantityMap[productId];
      const response = await fetch(`${API}/cartitems`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantityToAdd
        })
      });

      if (response.ok) {
        const updatedProducts = products.map(product => {
          if (product.product_id === productId) {
            return { ...product, stock_quantity: product.stock_quantity - quantityToAdd };
          }
          return product;
        });
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    const updatedQuantityMap = { ...quantityMap, [productId]: isNaN(quantity) || quantity === '' ? '' : parseInt(quantity) };
    setQuantityMap(updatedQuantityMap);
  };

  return (
    <div>
      <h1>Welcome to Anime Figure Store</h1>
      <input
        type="text"
        placeholder="Search by name/category..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {Array.from(new Set(products.map(product => product.category))).map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.product_id}>
            <Link to={`/product/${product.product_id}`}>
              <img src={product.image_url} alt={product.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            
            {/* Display other product details */}
            <div>Name: {product.name}</div>
            </Link>
            <div>Series: {product.series}</div>
            <div>Price: {product.price}</div>
            <div>Stock Quantity: {product.stock_quantity}</div>
            <div>Category: {product.category}</div>
            <div>Description: {product.description}</div>
            
            {/* Quantity input and Add to Cart button */}
            <input
              type="number"
              min="1"
              value={quantityMap[product.product_id]}
              onChange={(e) => handleQuantityChange(product.product_id, parseInt(e.target.value))}
            />
            <button onClick={() => handleAddToCart(product.product_id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
