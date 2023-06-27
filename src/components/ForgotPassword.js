import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });
      setMessage(response.data.message);
      toast.success(response.data.message);
      navigate('/reset-Password/:token');
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-form'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      </div>
      <ToastContainer />
      </div>
  );
};


export default ForgotPassword;