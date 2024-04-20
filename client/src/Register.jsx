import { useState } from 'react';
import PropTypes from "prop-types";

const API = "https://fsa-capstone.onrender.com/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  setErrorMessage("Failed to create account");
  setSuccessMessage("Account created successfully! Please log in."); 

  // Render the registration form
  return (
    <div className="form-container">
      <h2 className="form-heading">Sign Up</h2>
      {/* Display success message if registration is successful */}
      {successMessage && <p className="success">{successMessage}</p>}
      {/* Display error message if there's an error */}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {/* Registration form */}
      <form onSubmit={handleSubmit}>
        {/* First Name input */}
        <label htmlFor="firstname">
          First Name:
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="input-field"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </label>
        {/* Last Name input */}
        <label htmlFor="lastname">
          Last Name:
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="input-field"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </label>
        {/* Email input */}
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        {/* Password input */}
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
        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// PropTypes validation for the Register component
Register.propTypes = {
  token: PropTypes.func.isRequired, // Token prop is a required function
};

export default Register;
