import { useState } from 'react';

const API = "https://fsa-capstone.onrender.com/api/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      const data = await response.json();
    // Store the token in local storage
    localStorage.setItem('token', data.token);
      console.log('Logged in successfully');
      setSuccessMessage('Logged in successfully');
      window.location.href = '/products';
    } catch (error) {
      console.error('Failed to log in', error);
      setErrorMessage('User doesnt exist');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Login</h2>
      {/* Display success message if registration is successful */}
      {successMessage && <p className="success">{successMessage}</p>}
      {/* Display error message if there's an error */}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            name="email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
