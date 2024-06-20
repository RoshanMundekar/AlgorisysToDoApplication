import React, { useState } from 'react';
import '../stylecss/login.css';
import logo from '../logo.png';
import { Link } from 'react-router-dom';
import { ipofserver } from '../global';
import axios from "axios";


export default function Register() {

  const [formData, setFormData] = useState({
   
    email: "",
    username: "",
    password: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (Object.values(formData).some(value => value === "")) {
      alert("All fields are required");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post(ipofserver + 'userRegister', formData);
      if (response.data === "success") {
        alert("User registered successfully");
        // Clear the form after successful registration
        window.location.href = '/';
      } else {
        alert("Failed to register user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register user");
    }
  };


  return (
    <div>
      <div>
        <form className="login" onSubmit={handleSubmit}>
          <div className="header-container">
            <img src={logo} alt="Logo" className="logo" />
            <h2>TODOER</h2>
          </div>
          <p>Please Register Here</p>
          <div className="form-container">
            <div className="input-container">
              <i className="fas fa-envelope icon"></i>
              <input type="email" placeholder="Enter Your EmailAddress" id="EMAIL" name="email" value={formData.email} onChange={handleChange} class="input-field" />
            </div>

            <div className="input-container">
              <i className="fas fa-user icon"></i>
              <input type="text" placeholder="Enter Your Username" id="USERNAME" name="username"  value={formData.username} onChange={handleChange} class="input-field" />
            </div>

            <div className="input-container">
              <i className="fas fa-lock icon"></i>
              <input type="password" placeholder="Enter Your Password" id="PASSWORD" name="password" value={formData.password} onChange={handleChange} class="input-field" />
            </div>
          </div>


          <input type="submit" value="Log In" />
          <div class="links">

            <Link to="/">Login Page</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
