import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let message = '';
    if (name === 'email') {
      if (!value) message = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) message = 'Invalid email format';
    }
    if (name === 'password') {
      if (!value) message = 'Password is required';
    }
    setErrors(prev => ({ ...prev, [name]: message }));
  };

  const validateForm = () => {
    validateField('email', form.email);
    validateField('password', form.password);
    return Object.values(errors).every(error => !error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Logging in with', form);
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, { email: form.email, password: form.password })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            alert('Login Completed')
            navigate('/home')
          }
        }).catch((err) => {
          console.log(err)
          if (err.status === 404) {
            alert('No Such User')
          }else if(err.status === 401){
            alert("Incorrect Password Couldn't Login")
          }
        })
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        <div className="d-flex align-item-center justify-content-center">New User ? <Link to="/Register">Register</Link></div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
