import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let message = '';
    if (name === 'fullName') {
      if (!value.trim()) message = 'Full Name is required';
    }
    if (name === 'email') {
      if (!value) message = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) message = 'Invalid email format';
    }
    if (name === 'password') {
      if (!value) message = 'Password is required';
      else if (value.length < 6) message = 'Password must be at least 6 characters';
    }
    setErrors(prev => ({ ...prev, [name]: message }));
  };

  const validateForm = () => {
    validateField('fullName', form.fullName);
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
      console.log('Registered:', form);
      axios.post(`${import.meta.env.VITE_API_URL}/register`, { username: form.fullName, email: form.email, password: form.password })
        .then((res) => {
          console.log(res)
          if (res.status == 201) {
            alert('Registeration Completed')
            navigate('/login')
          }
        }).catch((err) => {
          console.log(err)
          if (err.status === 409) {
            alert('User Already Exists')
          }
        })
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            value={form.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="invalid-feedback">{errors.fullName}</div>
        </div>
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
        <div className="d-flex align-items-center justify-content-center">Already Exist ? <Link to="/Login">Login</Link></div>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;