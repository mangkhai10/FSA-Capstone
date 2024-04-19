import { useState } from 'react';

const API = "https://fsa-capstone.onrender.com/api";

const Register = ({ onRegister }) => {
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
      onRegister(data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  setErrorMessage("Failed to create account");
  setSuccessMessage("Account created successfully! Please log in."); 

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
