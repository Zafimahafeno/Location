import React from 'react';

const ToggleContainer = ({ active, children }) => {
    return (
        <div className={`toggle-container ${active ? 'active' : ''}`}>
            {children}
        </div>
    );
};

export default ToggleContainer;
