import React, { useState } from 'react';
import axios from 'api/axios.js';
import './authenticationForm.scss';
import { useAuth } from 'context/authContext.js';

const AuthenticationForm = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        return value.length >= 3;
      case 'email':
        return /^\S+@\S+\.\S+$/.test(value);
      case 'password':
        return value.length >= 6;
      case 'confirmPassword':
        return value === formData.password;
      case 'name':
      case 'surname':
        return value.length > 0;
      case 'phone':
        return /^\+?\d{10,}$/.test(value); // Simple phone number check
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isValid = validateField(name, value);
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: !isValid });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define fields to validate based on form state
    const fieldsToValidate = isLogin
      ? ['username', 'password']
      : ['username', 'email', 'password', 'confirmPassword', 'name', 'surname', 'phone'];

    // Validate only the required fields
    const formValid = fieldsToValidate.every((fieldName) => {
      const value = formData[fieldName];
      return validateField(fieldName, value);
    });

    if (!formValid) {
      alert('Please correct the errors in the form');
      return;
    }

    try {
      const response = isLogin
        ? await axios.post('/api/users/login', { username: formData.username, password: formData.password })
        : await axios.post('/api/users/signup', formData);

      login(response.data.accessToken, response.data.refreshToken, { username: formData.username });
      // Handle login/registration logic
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  // Toggle between Login and Registration
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-000 leading-tight"
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-000 leading-tight"
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>

        {/* Conditional Rendering for Registration Fields */}
        {!isLogin && (
          <>
            {/* Additional Fields for Registration */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Repeat Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-000 leading-tight"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-000 leading-tight"
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-000 leading-tight"
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                Surname
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-000 leading-tight"
                id="surname"
                type="text"
                name="surname"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-000 leading-tight"
                id="phone"
                type="tel"
                name="phone"
                onChange={handleChange}
              />
            </div>
            {/* Add other fields like password, confirm password, name, surname, phone */}
          </>
        )}

        {/* Submit Button */}
        <button className="btn btn-primary" type="submit">
          {isLogin ? 'Login' : 'Register'}
        </button>

        {/* Toggle Form */}
        <p className="text-sm text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button type="button" onClick={toggleForm} className="text-blue-500 hover:text-blue-700 ml-1">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthenticationForm;
