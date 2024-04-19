// Import necessary modules and set up the Express app
const {
    client,
    createAdminUser,
    createTables,
    createUser,
    createProduct,
    createCartItem,
    createOrderItem,
    createOrderDetail,
    fetchUsers,
    fetchProducts,
    fetchCartItems,
    fetchOrderItems,
    deleteProduct,
    deleteCartItem,
    findUserByToken,
    authenticate
  } = require('./db');
  const express = require('express');
  const app = express();
  app.use(express.json());
  const { SampleData } = require("./sampledata");
  // Serve static files for deployment
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://fsa-capstone.onrender.com/api', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  withCredentials: true,
}));
  
 // Middleware to check if the user is logged in
const isLoggedIn = async (req, res, next) => {
    try {
      req.user = await findUserByToken(req.headers.authorization);
      next();
    } catch (ex) {
      next(ex);
    }
  };
  const isAdmin = async (req, res, next) => {
    try {
      req.user = await findUserByToken(req.headers.authorization);
      if (req.user.role === 'admin') {
        next();
      } else {
        res.status(401).send('Unauthorized');
      }
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
  
  
  app.put('/api/admin/users', isAdmin, async (req, res, next) => {
    try {
      res.send(await fetchUser(req.params.userId));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.put('/api/admin/users/:userId', isAdmin, async (req, res, next) => {
    try {
      res.send(await fetchUser(req.params.userId));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/admin/products', isAdmin, async (req, res, next) => {
    try {
      res.send(await fetchProducts());
    } catch (ex) {
      next(ex);
    }
  });
  app.post('/api/admin/products', isAdmin, async (req,res, next) => {
    try {
      res.send(await createProduct(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.put('/api/admin/products/:productId', isAdmin, async (req,res, next) => {
    try {
      res.send(await fetchProduct(req.params.productId, req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.delete('/api/admin/products/:productId', isAdmin, async (req,res, next) => {
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

  app.get('/api/users', async (req, res, next) => {
    try {
      res.send(await fetchUsers());
    } catch (ex) {
      next(ex);
    }
  });

  
  // Product endpoints
  app.post('/api/products', async (req, res, next) => {
    try {
      res.status(201).send(await createProduct(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/products', async (req, res, next) => {
    try {
      res.send(await fetchProducts());
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/products/:productId', async (req, res, next) => {
    try {
      res.send(await fetchProduct(req.params.productId));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.delete('/api/products/:productId', async (req, res, next) => {
    try {
      await deleteProduct(req.params.productId);
      res.sendStatus(204);
    } catch (ex) {
      next(ex);
    }
  });


  // Cart Item endpoints
  app.post('/api/cartitems', isLoggedIn, async (req, res, next) => {
    try {
      res.status(201).send(await createCartItem(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/cartitems', isLoggedIn, async (req, res, next) => {
    try {
      res.send(await fetchCartItems());
    } catch (ex) {
      next(ex);
    }
  });
  
  app.delete('/api/cartitems/:productId', isLoggedIn ,async (req, res, next) => {
    try {
      await deleteCartItem(req.params.productId);
      res.sendStatus(204);
    } catch (ex) {
      next(ex);
    }
  });
  
  app.put('/api/cartitems/:productId', isLoggedIn, async (req, res,next) => {
    try {
      res.send(await fetchCartItems(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.post('/api/cartitems', async (req, res, next) => {
    try {
      res.status(201).send(await createCartItem(req.body));
    } catch (ex) {
      next(ex);
    }
  });

  app.get('/api/cartitems', async (req, res, next) => {
    try {
      res.send(await fetchCartItems());
    } catch (ex) {
      next(ex);
    }
  });
  app.delete('/api/cartitems/:productId', async (req, res, next) => {
    try {
      await deleteCartItem(req.params.productId);
      res.sendStatus(204);
    } catch (ex) {
      next(ex);
    }
  });
  
  app.put('/api/cartitems/:productId', async (req, res,next) => {
    try {
      res.send(await fetchCartItems(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  

  // Order Item endpoints
  app.post('/api/orderitems', async (req, res, next) => {
    try {
      res.status(201).send(await createOrderItem(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/orderitems', async (req, res, next) => {
    try {
      res.send(await fetchOrderItems());
    } catch (ex) {
      next(ex);
    }
  });
  
  // Order Item Detail endpoints
  app.post('/api/orderitems/:orderId/orderdetails', async (req, res, next) => {
    try {
      res.status(201).send(await createOrderDetail(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/orderitems/:orderId/orderdetails', async (req, res, next) => {
    try {
      res.send(await fetchOrderDetails(req.params.orderId));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.delete('/api/cartitems/:cartItemId', async (req, res, next) => {
    try {
      await deleteCartItem(req.params.cartItemId);
      res.sendStatus(204);
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
  