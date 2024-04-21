// Import necessary modules and set up the Express app
const {
    client,
    createAdminUser,
    createTables,
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
    deleteProduct,
    deleteCartItem,
    findUserByToken,
    authenticate,
    deleteAddress,
    deletePaymentMethod
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
// Middleware to check if the user has admin role
const isAdmin = async (req, res, next) => {
  try {
    const user = await findUserByToken(req.headers.authorization);
    if (user.role === 'admin') {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
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

  app.delete('/api/users/:userId', async (req, res, next) => { 
    try {
      res.send(await deleteAddress(req.params.userId));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.delete('/api/users/:userId', async (req, res, next) => { 
    try {
      res.send(await deletePaymentMethod(req.params.userId));
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
  app.post('/api/cartitems', async (req, res, next) => {
    try {
        let user_id;
        if (req.headers.authorization) {
            const user = await findUserByToken(req.headers.authorization);
            user_id = user.id;
        }
        // Assuming user_id is null for non-authenticated users
        const cartItem = { ...req.body, user_id };
        res.status(201).send(await createCartItem(cartItem));
    } catch (ex) {
        next(ex);
    }
});
// Get cart items endpoint (for both authenticated and non-authenticated users)
  app.get('/api/cartitems', async (req, res, next) => {
    try {
      const user_id = req.headers.authorization ? (await findUserByToken(req.headers.authorization)).id : null ;
      const cartitems = await fetchCartItems(user_id);
      res.send(cartitems);
      } catch (ex) {
        next(ex);
    }
  });
  // Update cart item endpoint (for both authenticated and non-authenticated users)
app.put('/api/cartitems/:cartItemId', async (req, res, next) => {
  try {
      const user_id = req.headers.authorization ? (await findUserByToken(req.headers.authorization)).id : null;
      const cartItem = { ...req.body, user_id };
      const updatedCartItem = await updateCartItem(req.params.cartItemId, cartItem);
      res.send(updatedCartItem);
  } catch (ex) {
      next(ex);
  }
});
// Delete cart item endpoint (for both authenticated and non-authenticated users)
app.delete('/api/cartitems/:cartItemId', async (req, res, next) => {
  try {
      const user_id = req.headers.authorization ? (await findUserByToken(req.headers.authorization)).id : null;
      await deleteCartItem(req.params.cartItemId, user_id);
      res.sendStatus(204);
  } catch (ex) {
      next(ex);
  }
});

  // Order Item endpoints
  app.post('/api/orderitems', isLoggedIn, async (req, res, next) => {
    try {
      res.status(201).send(await createOrderItem(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/orderitems', isLoggedIn, async (req, res, next) => {
    try {
      res.send(await fetchOrderItems());
    } catch (ex) {
      next(ex);
    }
  });
  
  // Order Item Detail endpoints
  app.post('/api/orderitems/:orderId/orderdetails', isLoggedIn, async (req, res, next) => {
    try {
      res.status(201).send(await createOrderDetail(req.body));
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get('/api/orderitems/:orderId/orderdetails', isLoggedIn, async (req, res, next) => {
    try {
      res.send(await fetchOrderDetails(req.params.orderId));
    } catch (ex) {
      next(ex);
    }
  });
  
  // Route to checkout and place an order
  app.post('/api/checkout', isLoggedIn, async (req, res, next) => {
    try {
      const { address, paymentMethod } = req.body;
      const order = await checkout(req.user.id, address, paymentMethod);
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
  