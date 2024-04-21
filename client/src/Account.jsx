import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api/auth";

const Account = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  useEffect(() => {
    authenticate();
  }, [token]); 

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
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to fetch user data. Please try again later.');
      }
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    history('/products');
    window.location.reload();
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
      {userData && (
        <div>
          <p>First Name: {userData.first_name}</p>
          <p>Email: {userData.email}</p>
          {/* Render other user data as needed */}
        </div>
      )}
    </div>
  );
};

export default Account;
