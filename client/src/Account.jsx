import { useState, useEffect } from 'react';

const API = "https://fsa-capstone.onrender.com/api/auth";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API}/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer $('token')`,
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
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
  }, []);

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
        </div>
      )}
    </div>
  );
};

export default Account;
