import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Register from './Register';
import Products from './Products';
import Login from './Login';
import Account from './Account';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== token) {
      setToken(storedToken || null);
    }
  }, [token]);

  return (
      <div>
        <Navigation token={token} setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/register"
            element={<Register token={setToken} />}
          />
          <Route path="/login" element={<Login token={setToken} />} />
          <Route path="/account" element={<Account token={setToken} />} />
        </Routes>
      </div>
  );
}

export default App;
