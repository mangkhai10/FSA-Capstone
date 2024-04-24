import { useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Products from './components/Products';
import Login from './components/Login';
import Account from './components/Account';
import SingleProduct from './components/SingleProduct'; 
import Cart from './components/Cart';
import PlaceOrder from './components/PlaceOrder';
import OrderConfirmation from './components/OrderConfirmation';


function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  
  return (
    <div>
      <Navigation token={token} setToken={setToken}/>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<SingleProduct/>} /> 
        <Route path="/cart" element={<Cart token={token} setToken={setToken}/>} /> 
        <Route path="/order" element={<PlaceOrder token={token} setToken={setToken} />} />
        <Route path="/order/:orderId" element={<OrderConfirmation token={token}  setToken={setToken}/>} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken}/>} />
        <Route path="/account" element={<Account token={token} setToken={setToken} />} />

      </Routes>
    </div>
  );
}

export default App;
