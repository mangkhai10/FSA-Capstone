import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from './Register';
import Products from './Products';

function App() {
  // State to manage the authentication token
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <div>
      {/* Define routes for different components */}
      <Routes token={token}>
        {/* Route for displaying products */}
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        {/* Route for registration */}
        <Route path="/register" element={<Register token={setToken} />} />
      </Routes>
    </div>
  );
}

export default App;
