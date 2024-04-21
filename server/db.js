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
    DROP TABLE IF EXISTS adminuser;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS cart_items ;
    DROP TABLE IF EXISTS order_items ;
    DROP TABLE IF EXISTS order_details ;

    -- Create adminuser table
    CREATE TABLE adminuser (
      adminuser_id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE
    );

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
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock_quantity INT NOT NULL,
      category VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      series VARCHAR(50) NOT NULL
    );

    -- Create cart_items table
    CREATE TABLE cart_items (
      cart_item_id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      product_id INT REFERENCES products(product_id),
      quantity INT NOT NULL
    );

    -- Create order_items table
    CREATE TABLE order_items (
      order_item_id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      product_id INT REFERENCES products(product_id),
      quantity INT NOT NULL
    );

    -- Create order_details table
    CREATE TABLE order_details (
      order_detail_id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      total_amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending'
    );
  `;
  // Execute the SQL query to create tables
  await client.query(SQL);
};

const createAdminUser = async ({ username, password, is_admin }) => {
  const SQL = `
    INSERT INTO adminuser (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [username, await bcrypt.hash(password, 5), is_admin]);
  return response.rows[0];
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

const createProduct = async ({ name, description, price, stock_quantity, category, image_url ,series}) => {
  const SQL = `
    INSERT INTO products (name, description, price, stock_quantity, category, image_url, series) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *
  `;
  const response = await client.query(SQL, [name, description, price, stock_quantity, category, image_url, series]);
  return response.rows[0];
};

const createCartItem = async ({ user_id, product_id, quantity }) => {
  const SQL = `
    INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [user_id, product_id, quantity]);
  return response.rows[0];
};

const createOrderItem = async ({ user_id, product_id, quantity }) => {
  const SQL = `
    INSERT INTO order_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [user_id, product_id, quantity]);
  return response.rows[0];
};

const createOrderDetail = async ({ user_id, total_amount, status }) => {
  const SQL = `
    INSERT INTO order_details (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [user_id, total_amount, status]);
  return response.rows[0];
};
const createSingleProduct = async ({ name, description, price, stock_quantity, category, image_url ,series}) => {
  const SQL = `
    INSERT INTO products (name, description, price, stock_quantity, category, image_url, series) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *
  `;
  const response = await client.query(SQL, [name, description, price, stock_quantity, category, image_url, series]);
  return response.rows[0];
}

const fetchSingleProduct = async () => {
  const SQL = `
    SELECT * FROM products
  `;
  const response = await client.query(SQL);
  return response.rows[0];
}

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

const fetchCartItems = async (user_id) => {
  const SQL = `
    SELECT * FROM cart_items WHERE user_id = $1
  `;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};

const fetchOrderItems = async (user_id) => {
  const SQL = `
    SELECT * FROM order_items WHERE user_id = $1
  `;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};

const fetchOrderDetails = async (user_id) => {
  const SQL = `
    SELECT * FROM order_details WHERE user_id = $1
  `;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};

const deleteProduct = async (productId) => {
  const SQL = `
    DELETE FROM products WHERE product_id = $1 RETURNING *
  `;
  const response = await client.query(SQL, [productId]);
  return response.rows[0];
};

const deleteCartItem = async (cartItemId) => {
  const SQL = `
    DELETE FROM cart_items WHERE cart_item_id = $1
  `;
  await client.query(SQL, [cartItemId]);
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
  createAdminUser,
  createTables,
  createAdminUser,
  createUser,
  updateUser,
  createProduct,
  createCartItem,
  createOrderItem,
  createOrderDetail,
  fetchUsers,
  fetchProducts,
  fetchCartItems,
  fetchOrderItems,
  fetchOrderDetails,
  deleteProduct,
  deleteCartItem,
  findUserByToken,
  authenticate,
  createSingleProduct,
  fetchSingleProduct,
};
