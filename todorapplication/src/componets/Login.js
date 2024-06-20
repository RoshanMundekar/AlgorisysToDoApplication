import React, { useState } from 'react';
import logo from '../logo.png';
import '../stylecss/login.css';
import { Link } from 'react-router-dom';
import { ipofserver } from '../global';
import axios from "axios";

export default function Login() {
    const [formData, setFormData] = useState({
        email: 'mundekarroshan566@gmail.com',
        password: 'amol',
    
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const clearInput = () => {
        setFormData({
            email: '',
            password: '',
            
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.email === '' || formData.password === '' ) {
            alert("Please enter all details!");
        } else {
            axios.post(ipofserver + 'userLogin', formData)
            .then(function (response) {
                if (response.data !== "fail") {
                  
                    alert(`Welcome, ${response.data[1]}`);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    window.location.href = '/home';
                } else {
                    alert("Invalid username and password!");
                    clearInput();
                }
            })
            .catch(function (error) {
                console.error('Error occurred during login:', error);
                alert("An error occurred during login!");
            });
        }
    }


    return (
        <div>
            <form className="login" onSubmit={handleSubmit}>
            
                <div className="header-container">
                    <img src={logo} alt="Logo" className="logo" />
                    <h2>TODOER</h2>
                </div>
                <p>Please login Here</p>
                <div className="form-container">
                    <div className="input-container">
                        <i className="fas fa-envelope icon"></i>
                        <input type="email" placeholder="Enter Your EmailAddress" id="email" name="email" value={formData.email} onChange={handleChange} class="input-field" />
                    </div>

                    <div className="input-container">
                        <i className="fas fa-lock icon"></i>
                        <input type="password" placeholder="Password" id="password"name="password" value={formData.password} onChange={handleChange} class="input-field" />
                    </div>
                </div>
                <input type="submit" value="Log In" />
                <div class="links">
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}
