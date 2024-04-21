import { useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Register from './Register';
import Products from './Products';
import Login from './Login';
import Account from './Account';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  
  return (
    <div>
      <Navigation token={token} setToken={setToken}/>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken}/>} />
        <Route path="/account" element={<Account token={token} setToken={setToken} />} />
      </Routes>
    </div>
  );
}

export default App;
