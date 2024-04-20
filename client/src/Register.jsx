import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = "https://fsa-capstone.onrender.com/api/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

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

      const json = await response.json();
      if (response.ok) {
        window.localStorage.setItem('token', json.token);
        console.log(json.message || "Register successful");
        history("/login");
      } else {
        setErrorMessage(json.message || 'User already exists. Please login.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Sign Up</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">
          First Name:
          <input
            type="text"
            id="first_name"
            name="first_name"
            className="input-field"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
