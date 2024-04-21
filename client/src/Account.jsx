import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api/auth";

const Account = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    authenticate();
  }, []); // Run once when component mounts

  const authenticate = async () => {
    if (token) {
      try {
        const response = await fetch(`${API}/me`, {
          method: 'GET',
          headers: {
            Authorization: token
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData); // Set user details in state
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to fetch user data. Please try again later.');
      }
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    history('/products');
  };

  return (
    <div className="account-container">
      <div className="navigation-item">
        <button onClick={logout} className="navigation-link">
          Logout
        </button>
      </div>
      <h2 className="account-heading">Account Information</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {user && (
        <div>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>Payment Method: {user.payment_method}</p>
        </div>
      )}
    </div>
  );
};

export default Account;
