import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import axios from 'axios';
import '../styles.css';
import { getCsrfToken } from '../Misc/Helpers';

function Login() {
    const authTitle = "Login";

    const [message, setMessage] = useState(false)

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    function handleInputChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);

        axios.post('/api/login/', formData, {
            headers: {
              'X-CSRFToken': getCsrfToken(),
              'Content-Type': 'application/json'
            }
        })
        .then(response => {
            localStorage.setItem('user', response.data['user']);
            localStorage.setItem('token', response.data['token']);
            localStorage.setItem('maxEntriesPerPage', response.data['maxEntriesPerPage']);
            window.location.href = "/";
        })
        .catch(error => {
            console.log(error);
            setMessage(error.response.data['message']);
        })
    }

    const loginForm = (
        <form onSubmit={handleSubmit}>
            <div className="my-2">
                <input autoFocus className="form-control" type="text" name="username" placeholder="Username" onChange={handleInputChange} />
            </div>
            <div className="my-2">
                <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleInputChange} />
            </div>
            <div className="text-center my-2">
                <input className="btn btn-secondary text-center" type="submit" value="Login" />
            </div>
        </form>
    );

    const swapPrompt =  (
        <div>
            Don't have an account? <a href="/register/">Register here.</a>
        </div>
    );

    return (
        <AuthLayout message={message} authTitle={authTitle} authForm={loginForm} swapPrompt={swapPrompt} />
    );
}

export default Login;