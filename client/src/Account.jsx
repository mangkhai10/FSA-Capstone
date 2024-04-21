import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api";

const Account = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [auth, setAuth] = useState(null); // Adding auth state
  const history = useNavigate();

  useEffect(() => {
    authenticate();
  }, [token]);

  const authenticate = async () => {
    if (token) {
      try {
        const response = await fetch(`${API}/users/`, {
          method: 'GET',
          headers: {
            Authorization: token
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json(); // Parse user data from response
        setAuth(userData); // Set the user data to the auth state
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
      {auth && ( // Render user details if auth state is not null
        <div className="user-details">
          <p><strong>First Name:</strong> {auth.first_name}</p>
          <p><strong>Last Name:</strong> {auth.last_name}</p>
          <p><strong>Email:</strong> {auth.email}</p>
          <p><strong>Address:</strong> {auth.address}</p>
          <p><strong>Payment Method:</strong> {auth.payment_method}</p>
        </div>
      )}
    </div>
  );
};

export default Account;
