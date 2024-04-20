import { useState, useEffect } from 'react';

const API = "https://fsa-capstone.onrender.com/api/auth";

const Account = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`${API}/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage("Failed to fetch user data");
      }
    };

    fetchUserData();

    // Cleanup function
    return () => {
      setUserData(null); // Clear user data on component unmount
    };
  }, [token]); // Include token in the dependency array to re-fetch data when token changes

  return (
    <div className="account-container">
      <h2 className="account-heading">Account Information</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {userData && (
        <div className="user-details">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>First Name:</strong> {userData.first_name}</p>
          <p><strong>Last Name:</strong> {userData.last_name}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Payment Method:</strong> {userData.payment_method}</p>
        </div>
      )}
    </div>
  );
};

export default Account;
