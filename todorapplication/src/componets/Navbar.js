import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylecss/navbar.css';
import ProfileModal from './ProfileModal';

import IconButton from './IconButton';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import './fontAwesomeSetup';

import logo from '../logo.png';
export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profile = {
    name: '',
    email: '',
    // Add more profile details as needed
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const favitem = () => {

    window.location.href = '/favraoute';

  }




  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <div className="App">
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ height: '50px' }}
          />
        </div>
        <div style={{ marginLeft: '20pc' }} >
          <IconButton icon={faBookmark} size="3x" onClick={event => favitem()} />
        </div>
        <ul className="menu-items"></ul>
        <h1 className="logo" style={{ marginRight: '22pc' }}>TODOER</h1>
        <div className="profile">
          <div className="icon_wrap">
            <span className="name">{JSON.parse(localStorage.getItem('user'))[1]}</span>
            <i className="fas fa-chevron-down"></i>
          </div>
          <div className="profile_dd">
            <ul className="profile_ul">
              <li className="profile_li">
                <Link className="profile" to="#" onClick={openModal}>
                  <span className="picon"><i className="fas fa-user-alt"></i></span>Profile
                </Link>
              </li>
              <ProfileModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                profile={profile}
              />

              <li className="profile_li">
                <Link className="logout" to="/">
                  <span className="picon"><i className="fas fa-sign-out-alt"></i></span>Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
