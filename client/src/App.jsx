import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Products from './Products';
function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <div>
    <Routes token={token}>
    <Route path="/" element={<Products />} />
    <Route path="/products" element={<Products />} />
    <Route path="/register" element={<Register token={setToken} />} />
          <Route
            path="/login"
            element={<Login setToken={setToken} token={token} />}
          />
    </Routes>
    </div>
  );
};

export default App;
