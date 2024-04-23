import { useState, useEffect } from 'react';
import OrderConfirmation from './OrderConfirmation'; // Import the OrderConfirmation component

const API = "https://fsa-capstone.onrender.com/api";

const Account = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState('');
  const [editedPaymentMethod, setEditedPaymentMethod] = useState('');

  useEffect(() => {
    authenticate();
  }, []);  

  const authenticate = async () => {
    if (token) {
      try {
        const response = await fetch(`${API}/auth/me`, {
          method: 'GET',
          headers: {
            Authorization: token
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
        setLoading(false); // Set loading to false after user data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to fetch user data. Please try again later.');
        setLoading(false); // Set loading to false in case of error
      }
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleEdit = () => {
    setEditing(true);
    setEditedAddress(user.address || '');
    setEditedPaymentMethod(user.payment_method || '');
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          address: editedAddress,
          payment_method: editedPaymentMethod
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      // Update user object with edited values
      setUser(prevUser => ({
        ...prevUser,
        address: editedAddress,
        payment_method: editedPaymentMethod
      }));
      setEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
      setErrorMessage('Failed to update user data. Please try again later.');
    }
  };

  return (
    <div className="account-container">
      <div className="navigation-item">
        <button onClick={logout} className="navigation-link">
          Logout
        </button>
      </div>
      <h2 className="account-heading">Account Information</h2>
      {loading && <p>Loading...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {user && (
        <div>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          {editing ? (
            <input
              type="text"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
            />
          ) : (
            <button onClick={handleEdit}>Edit Address</button>
          )}
          {editing && <button onClick={handleSave}>Save</button>}
          <p>Payment Method: {user.payment_method}</p>
          {editing ? (
            <input
              type="text"
              value={editedPaymentMethod}
              onChange={(e) => setEditedPaymentMethod(e.target.value)}
            />
          ) : (
            <button onClick={handleEdit}>Edit Payment Method</button>
          )}
          {editing && <button onClick={handleSave}>Save</button>}
          <div>
            <h3>Orders Placed</h3>
            <OrderConfirmation token={token} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
