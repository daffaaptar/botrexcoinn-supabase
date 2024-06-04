import React from 'react';

function Button({ type, onClick }) {
    const buttonStyles = {
        earn: "px-8 py-4 bg-green-500 text-white font-bold border-4 border-green-700 rounded-none transform hover:scale-105 active:scale-95",
        friend: "px-8 py-4 bg-blue-500 text-white font-bold border-4 border-blue-700 rounded-none transform hover:scale-105 active:scale-95",
        boost: "px-8 py-4 bg-red-500 text-white font-bold border-4 border-red-700 rounded-none transform hover:scale-105 active:scale-95"
    };

    return (
        <button 
            className={`${buttonStyles[type]} m-2`}
            onClick={onClick}
        >
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
    );
}

export default Button;
