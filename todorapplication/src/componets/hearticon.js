// IconButton.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylecss/navbar.css';

const IconButton2 = ({ icon, size = '2x',todo, onClick, className }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
        if (onClick) onClick();
    };

    return (
        <button
            className={`btn-icon ${className}`}
            onClick={handleClick}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: todo[5] === 1 ? 'black' : 'white', // Color condition based on todo[5]
                fontSize:size
              }}
        >
            <FontAwesomeIcon icon={icon}  />
        </button>
    );
};

export default IconButton2;
