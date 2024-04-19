import { useState, useEffect } from 'react';

const API = "https://fsa-capstone.onrender.com/api";

const Account = ({ user }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    address: user.address,
    paymentMethod: user.paymentMethod
  });

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      address: user.address,
      paymentMethod: user.paymentMethod
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API}/update-user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      // Handle response as needed
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Account Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Account;
