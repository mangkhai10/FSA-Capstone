// Import necessary modules and set up the Express app
const {
    client,
    createTables,
    createAdminUser,
    createUser,
    createProduct,
    createCartItem,
    createOrderItem,
    createOrderDetail,
    fetchAdminUsers,
    fetchUsers,
    fetchProducts,
    fetchCartItems,
    fetchOrderItems,
    deleteProduct,
    deleteCartItem,
    findUserWithToken,
    authenticate
  } = require('./db');
  const express = require('express');
  const app = express();
  app.use(express.json());
  const { SampleData } = require("./sampledata");
  
  // Serve static files for deployment
  const cors = require('cors');
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    withCredentials: true,
  }));
  
  // Middleware to check if the user is logged in
  const isLoggedIn = async (req, res, next) => {
    try {
      req.user = await findUserWithToken(req.headers.authorization);
      next();
    } catch (ex) {
      next(ex);
    }
  };
  
  // Authentication endpoints
  app.post('/api/auth/register', async (req, res, next) => {
    try {
      res.send(await createUser(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.post('/api/auth/login', async (req, res, next) => {
    try {
      res.send(await authenticate(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/auth/me', isLoggedIn, (req, res, next) => {
    try {
      res.send(req.user);
    } catch (ex) {
      next(ex);
    }
  });
  
  // Admin endpoints
  
  app.get('/api/adminusers', async (req, res, next) => {
    try {
      res.send(await fetchAdminUsers());
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/admin/products', async (req, res, next) => {
    try {
      res.send(await fetchProducts());
    } catch (ex) {
      next(ex);
    }
  });
  app.post('/api/admin/products', async (req, res, next) => {
    try {
      res.send(await createProduct(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.delete('/api/admin/products/:productId', async (req, res, next) => {
    try {
      res.send(await deleteProduct(req.params.productId));
    } catch (ex) {
      next(ex);
    }
  });
  
  // User endpoints
  app.post('/api/users', async (req, res, next) => {
    try {
      res.status(201).send(await createUser(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.post('/api/users/:userId/cartitems', async (req, res, next) => {
    try {
      res.status(201).send(await createCartItem(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/users/:userId/cartitems', async (req, res, next) => {
    try {
      res.send(await fetchCartItems(req.params.userId));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.delete('/api/users/:userId/cartitems/:cartItemId', async (req, res, next) => {
    try {
      await deleteCartItem(req.params.cartItemId);
      res.sendStatus(204);
    } catch (ex) {
      next(ex);
    }
  });
  
  app.post('/api/users/:userId/orderitems', async (req, res, next) => {
    try {
      res.status(201).send(await createOrderItem(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/users/:userId/orderitems', async (req, res, next) => {
    try {
      res.send(await fetchOrderItems(req.params.userId));
    } catch (ex) {
      next(ex);
    }
  });
  
  // Route to checkout and place an order
  app.post('/api/checkout', isLoggedIn, async (req, res, next) => {
    try {
      const { address, paymentMethod } = req.body;
      const order = await checkout(req.user.user_id, address, paymentMethod);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send({ error: err.message ? err.message : err });
  });
  
  // Initialize the server
  const init = async () => {
    const port = process.env.PORT || 3000;
  
    // Connect to the database
    await client.connect();
    console.log('Connected to the database');
  
    // Create database tables
    await createTables();
    console.log('Tables created');

    
  // Generate and insert dummy data
  await SampleData();
  console.log('Sample data inserted');
  
    // Start the server
    app.listen(port, () => console.log(`Listening on port ${port}`));
  };
  
  // Call the initialization function
  init();
  