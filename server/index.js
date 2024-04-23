// Import necessary modules and set up the Express app
const {
    client,
    createTables,
    createUser,
    updateUser,
    createProduct,
    createCartItem,
    fetchUsers,
    fetchProducts,
    fetchCartItems,
    deleteCartItem,
    findUserByToken,
    authenticate,
    createSingleProduct,
    fetchSingleProduct,
    createOrder,
    fetchOrders
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

  // Authentication endpoints
  app.post('/api/auth/register', async (req, res, next) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      res.send(await createUser({ first_name, last_name, email, password }));
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
  
  app.get('/api/auth/me', isLoggedIn, async (req, res, next) => {
    try {
      res.send(await findUserByToken(req.headers.authorization));
    } catch (ex) {
      next(ex);
    }
  });

  app.put('/api/users/:userId', isLoggedIn, async (req, res, next) => {
    try {
      const { address, payment_method } = req.body;
      const updatedUser = await updateUser(req.params.userId, { address, payment_method });
      res.send(updatedUser);
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

  app.get('/api/users/:userId', async (req, res, next) => {
    try {
      res.send(await fetchUser(req.params.userId));
    } catch (ex) {
      next(ex);
    }
  });

  app.delete('/api/users/:userId', async (req, res, next) => {
    try {
      res.send(await delete(req.params.userId));
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
  
app.post('/api/products/:productId ', async (req, res, next) => {
  try {
    res.status(201).send(await createSingleProduct(req.params.productId, req.body));
  } catch (ex) {
    next(ex);
  }
});
  app.get('/api/products/:productId', async (req, res, next) => {
    try {
      res.send(await fetchSingleProduct(req.params.productId));
    } catch (ex) {
      next(ex);
    }
  });

 // Cart Item endpoints
// Endpoint to add products to the cart
app.post('/api/cartitems', async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (req.headers.authorization) {
      // If authenticated, extract user ID from the token
      const user = await findUserByToken(req.headers.authorization);
      const user_id = user.id;
      // Add the product to the cart for the authenticated user
      const { product_id, quantity, price } = req.body;
      const cartItem = await createCartItem({ user_id, product_id, quantity, price });
      res.status(201).send(cartItem);
    } else {
      // For non-authenticated users, create a temporary session ID or use some other identifier
      const session_id = req.sessionID; // Example: Using Express session ID
      // Add the product to the cart for the non-authenticated user
      const { product_id, quantity, price } = req.body;
      const cartItem = await createCartItem({ session_id, product_id, quantity, price });
      res.status(201).send(cartItem);
    }
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

app.put('/api/cartitems/:cart_id', async (req, res, next) => {
  try {
    res.send(await fetchCartItems(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete('/api/cartitems/:cart_id', async (req, res, next) => {
  try {
    const cart_id = parseInt(req.params.cart_id);
    await deleteCartItem(cart_id);
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
  
  // Endpoint to initiate the checkout process
  app.post('/api/order', isLoggedIn, async (req, res, next) => {
    try {
      const { total_amount, address, payment_method } = req.body;
      // Get user ID from the logged-in user
      const user_id = req.user.id;
      // Create the order
      const order = await createOrder({ user_id, total_amount, address, payment_method });
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/orders', isLoggedIn, async (req, res, next) => {
    try {
      res.send(await fetchOrders());
    } catch (ex) {
      next(ex);
    }
  });app.get('/api/orders/:orderId', isLoggedIn, async (req, res, next) => {
    try {
      // Get user ID from the logged-in user
      const user_id = req.user.id;
      // Fetch the order by order ID
      const singleOrder = await fetchOrder(user_id, req.params.orderId);
      // Send the single order as the JSON response
      res.json(singleOrder);
    } catch (error) {
      // Forward any errors to the error handling middleware
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
  