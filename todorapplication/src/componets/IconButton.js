// IconButton.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const IconButton = ({ icon, size = '4x', onClick }) => {
    return (
        <button className="btn-icon" onClick={onClick} style={{ fontSize: size }}>
            <FontAwesomeIcon icon={icon}  />
        </button>
    );
};

export default IconButton;
