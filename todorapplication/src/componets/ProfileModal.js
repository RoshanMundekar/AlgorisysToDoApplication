import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Make sure to set the app element for accessibility

const ProfileModal = ({ isOpen, onRequestClose, profile }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Profile Modal"
    >
      <h2 style={{ color: 'black' }}>Profile Information</h2>
      <button onClick={onRequestClose}>Close</button>
      <div>
        <p><strong>Name:</strong> {JSON.parse(localStorage.getItem('user'))[1]}</p>
        <p><strong>Email:</strong> {JSON.parse(localStorage.getItem('user'))[2]}</p>
        {/* Add more profile information here */}
      </div>
    </Modal>
  );
};

export default ProfileModal;