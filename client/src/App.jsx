import { useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Register from './Register';
import Products from './Products';
import Login from './Login';
import Account from './Account';
import SingleProduct from './SingleProduct'; 
import Cart from './Cart';
import PlaceOrder from './PlaceOrder';


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
        <Route path="/checkout" element={<PlaceOrder token={token} setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken}/>} />
        <Route path="/account" element={<Account token={token} setToken={setToken} />} />
      </Routes>
    </div>
  );
}

export default App;
