import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api";

const Account = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState('');
  const [editedPaymentMethod, setEditedPaymentMethod] = useState('');
  const history = useNavigate();

  useEffect(() => {
    authenticate();
  }, []); // Run once when component mounts

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
    history('/products');
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

  const handleDeleteAddress = async () => {
    try {
      const response = await fetch(`${API}/users/${user.id}/address`, {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete address');
      }
      // Update user object with deleted address
      setUser(prevUser => ({
        ...prevUser,
        address: null
      }));
    } catch (error) {
      console.error('Error deleting address:', error);
      setErrorMessage('Failed to delete address. Please try again later.');
    }
  };

  const handleDeletePaymentMethod = async () => {
    try {
      const response = await fetch(`${API}/users/${user.id}/payment-method`, {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete payment method');
      }
      // Update user object with deleted payment method
      setUser(prevUser => ({
        ...prevUser,
        payment_method: null
      }));
    } catch (error) {
      console.error('Error deleting payment method:', error);
      setErrorMessage('Failed to delete payment method. Please try again later.');
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
          {user.address && (
            <button onClick={handleDeleteAddress}>Delete Address</button>
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
          {user.payment_method && (
            <button onClick={handleDeletePaymentMethod}>Delete Payment Method</button>
          )}
          {editing && <button onClick={handleSave}>Save</button>}
        </div>
      )}
    </div>
  );
};

export default Account;
