import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Import the CSS file

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
  }, []);

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
      const product = products.find(product => product.product_id === productId);
      const price = product.price;

      const response = await fetch(`${API}/cartitems`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantityToAdd,
          price: price
        })
      });

      if (response.ok) {
        const updatedProducts = products.map(prod => {
          if (prod.product_id === productId) {
            return { ...prod, stock_quantity: prod.stock_quantity - quantityToAdd };
          }
          return prod;
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
      product.character_name.toLowerCase().includes(query) ||
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

  return (
    <div className="container">
      <h1 className="heading">Welcome to Anime Figure Store</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name/category..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-field"
        />
        <select value={selectedCategory} onChange={handleCategoryChange} className="search-field">
          <option value="">All Categories</option>
          {Array.from(new Set(products.map(product => product.category))).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <ul className="products-container">
        {filteredProducts.map(product => (
          <li key={product.product_id} className="product-card">
            <Link to={`/product/${product.product_id}`}>
              <img src={product.image_url} alt={product.character_name} className="product-image" />
            </Link>
            <div className="product-details">
              <Link to={`/product/${product.product_id}`} className="product-name">{product.character_name}</Link>
              <div className="product-author">Series: {product.series}</div>
              <div className="product-price">Price: {product.price}</div>
              <div className="product-category">Category: {product.category}</div>
              <div className="product-description">Description: {product.description}</div>
            </div>
            <div className="product-actions">
              <button onClick={() => handleAddToCart(product.product_id)} className="add-to-cart-button">Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
