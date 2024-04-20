import { useState } from 'react';

const API = "https://fsa-capstone.onrender.com/api/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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
      const response = await fetch(`${API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        // If response is not okay, throw an error
        throw new Error('Failed to create account');
      }

      // If registration is successful, call the onSuccess callback
      setSuccessMessage("Account created successfully! Please log in.");
    } catch (error) {
      console.error('Error registering user:', error);
      // If registration fails, call the onError callback
      setErrorMessage("Failed to create account");
    }
  };

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
        <label htmlFor="first_name">
          First Name:
          <input
            type="text"
            id="first_tname"
            name="first_name"
            className="input-field"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>
        {/* Last Name input */}
        <label htmlFor="last_name">
          Last Name:
          <input
            type="text"
            id="last_name"
            name="last_name"
            className="input-field"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </label>
        {/* Last Name input */}
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            name="username"
            className="input-field"
            value={formData.username}
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

export default Register;
