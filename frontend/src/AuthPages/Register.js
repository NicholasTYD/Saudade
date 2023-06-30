import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import axios from 'axios';
import '../styles.css';
import { getCsrfToken } from '../Misc/Helpers';


function Register() {
    const authTitle = "Register";

    const [message, setMessage] = useState(false)

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmation: '',
    });

    function handleInputChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);

        axios.post('/api/register/', formData, {
            headers: {
              'X-CSRFToken': getCsrfToken(),
              'Content-Type': 'application/json'
            }
        })
        .then(response => {
            localStorage.setItem('user', response.data['user']);
            localStorage.setItem('token', response.data['token']);
            window.location.href = "/";
        })
        .catch(error => {
            console.log(error);
            setMessage(error.response.data['message']);
        })
    }

    const registerForm = (
        <form onSubmit={handleSubmit}>
            <div className="my-2">
                <input className="form-control" autoFocus type="text" name="username" placeholder="Username" onChange={handleInputChange} />
            </div>
            <div className="my-2">
                <input className="form-control" type="email" name="email" placeholder="Email Address" onChange={handleInputChange} />
            </div>
            <div className="my-2">
                <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleInputChange} />
            </div>
            <div className="my-2">
                <input className="form-control" type="password" name="confirmation" placeholder="Confirm Password" onChange={handleInputChange} />
            </div>
            <div className="my-2 text-center">
                <input className="btn btn-secondary text-center" type="submit" value="Register" />
            </div>
        </form>
    )
    
    const swapPrompt = (
      <div>
        Already have an account? <a href="/login">Log In here.</a>
      </div>
    );
  
    return (
      <AuthLayout message={message} authTitle={authTitle} authForm={registerForm} swapPrompt={swapPrompt} />
    );
};
  
  export default Register;