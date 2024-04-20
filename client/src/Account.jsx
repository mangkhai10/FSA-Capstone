import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api/auth";

const Account = ({ token }) => {
  const [auth, setAuth] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticate();
  }, []); 

  const authenticate = async () => {
    if (token) {
      try {
        const response = await fetch(`${API}/me`, {
          method: 'GET',
          headers: {
            Authorization: token
          }
        });
        const json = await response.json();
        if (response.ok) {
          setAuth(json);
        } else {
          setAuth(null);
          setErrorMessage(`Failed to fetch user data: ${json.message || response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="account-container">
      <div className="navigation-item">
        <button onClick={logout} className="navigation-link">
          Logout
        </button>
      </div>
      <h2 className="account-heading">Account Information</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {auth && Object.keys(auth).length > 0 && (
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
