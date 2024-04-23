// Import necessary modules
const pg = require('pg');
const uuid = require('uuid');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_figures_db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || "shhh";

// Function to create database tables
const createTables = async () => {
  const SQL = `
    -- Drop existing tables if they exist
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS cart_items ;
    DROP TABLE IF EXISTS orders ;

    -- Create users table
    CREATE TABLE users (
      id UUID PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(100) NULL,
      payment_method VARCHAR(100) NULL
    );

    -- Create products table
    CREATE TABLE products (
      product_id SERIAL PRIMARY KEY,
      character_name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock_quantity INT NOT NULL,
      category VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      series VARCHAR(50) NOT NULL
    );

    -- Create cart_items table
    CREATE TABLE cart_items (
      cart_id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      product_id INT REFERENCES products(product_id),
      quantity INT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      character_name VARCHAR(255),
      image_url VARCHAR(255)
    );
    
    CREATE TABLE orders (
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      total_amount DECIMAL(10, 2) NOT NULL,
      address VARCHAR(100) NOT NULL,
      payment_method VARCHAR(100) NOT NULL,
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
  `;
  // Execute the SQL query to create tables
  await client.query(SQL);
};

const createUser = async ({ first_name, last_name, email, password, address, payment_method }) => {
  const SQL = `
    INSERT INTO users (id, first_name, last_name, email, password, address, payment_method) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), first_name, last_name, email, await bcrypt.hash(password, 5), address, payment_method]);
  return response.rows[0];
};
const updateUser = async (userId, { address, payment_method }) => {
  const SQL = `
    UPDATE users SET address = $1, payment_method = $2 WHERE id = $3 RETURNING *
  `;
  const response = await client.query(SQL, [address, payment_method, userId]);
  return response.rows[0];
};

const createProduct = async ({ character_name, description, price, stock_quantity, category, image_url ,series}) => {
  const SQL = `
    INSERT INTO products (character_name, description, price, stock_quantity, category, image_url, series) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *
  `;
  const response = await client.query(SQL, [character_name, description, price, stock_quantity, category, image_url, series]);
  return response.rows[0];
};

const createCartItem = async ({ user_id, product_id, quantity, price }) => {
  // Check if the product already exists in the cart
  const existingCartItem = await findCartItemByProductId(user_id, product_id);

  if (existingCartItem) {
    // If the product exists in the cart, update the quantity
    const updatedQuantity = existingCartItem.quantity + quantity;
    await updateCartItemQuantity(existingCartItem.cart_id, updatedQuantity);
    return await fetchCartItem(existingCartItem.cart_id);
  } else {
    // Fetch character_name and image_url from products table
    const productInfo = await fetchSingleProduct(product_id);
    const { character_name, image_url } = productInfo;

    const SQL = `
      INSERT INTO cart_items (user_id, product_id, quantity, price, character_name, image_url) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const response = await client.query(SQL, [user_id, product_id, quantity, price, character_name, image_url]);
    return response.rows[0];
  }
};

const findCartItemByProductId = async (user_id, product_id) => {
  const SQL = `
    SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2
  `;
  const response = await client.query(SQL, [user_id, product_id]);
  return response.rows[0];
};

const updateCartItemQuantity = async (cart_id, quantity) => {
  const SQL = `
    UPDATE cart_items SET quantity = $1 WHERE cart_id = $2
  `;
  await client.query(SQL, [quantity, cart_id]);
};

const fetchCartItem = async (cart_id) => {
  const SQL = `
    SELECT * FROM cart_items WHERE cart_id = $1
  `;
  const response = await client.query(SQL, [cart_id]);
  return response.rows[0];
};



const createSingleProduct = async (product_id, character_name, description, price, stock_quantity, category, image_url, series) => {
  const SQL = `
    INSERT INTO products (product_id, character_name, description, price, stock_quantity, category, image_url, series) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `;
  const response = await client.query(SQL, [product_id, character_name, description, price, stock_quantity, category, image_url, series]);
  return response.rows[0];
};


const fetchSingleProduct = async (productId) => {
  const SQL = `
    SELECT * FROM products WHERE product_id = $1
  `;
  const response = await client.query(SQL, [productId]);
  return response.rows[0];
};


const fetchUsers = async () => {
  const SQL = `
    SELECT * FROM users
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchProducts = async () => {
  const SQL = `
    SELECT * FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchCartItems = async () => {
  const SQL = `
    SELECT * FROM cart_items
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const deleteProduct = async (productId) => {
  const SQL = `
    DELETE FROM products WHERE product_id = $1 RETURNING *
  `;
  const response = await client.query(SQL, [productId]);
  return response.rows[0];
};

const deleteCartItem = async (cart_id) => {
  const SQL = `
    DELETE FROM cart_items WHERE cart_id = $1
  `;
  await client.query(SQL, [cart_id]);
};

const createOrders = async ({ total_amount, address, payment_method }) => {
  const SQL = `
    INSERT INTO orders (id, total_amount, address, payment_method) VALUES ($1, $2, $3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), total_amount, address, payment_method]);
  return response.rows[0];
};

const fetchOrders = async (user_id, orderId) => {
  const SQL = `
    SELECT * FROM orders WHERE user_id = $1 AND id = $2
  `;
  const response = await client.query(SQL, [user_id, orderId]);
  return response.rows[0];
};


// Find user by token
const findUserByToken = async (token) => {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, first_name, last_name, email, address, payment_method FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};
// Authenticate a user based on email and password
const authenticate = async ({ email, password }) => {
  const SQL = `
    SELECT id, password, email
   FROM users 
   WHERE email=$1;
  `;
  const response = await client.query(SQL, [email]);
  if (!response.rows.length || (await bcrypt.compare(password, response.rows[0].password)) === false) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id }, JWT);
  return { token: token};
};

module.exports = {
  client,
  createTables,
  createUser,
  updateUser,
  createProduct,
  createCartItem,
  fetchUsers,
  fetchProducts,
  fetchCartItems,
  deleteProduct,
  deleteCartItem,
  findUserByToken,
  authenticate,
  createSingleProduct,
  fetchSingleProduct,
  createOrders,
  fetchOrders
};
