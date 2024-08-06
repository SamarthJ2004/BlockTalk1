import React, { useState } from 'react';
import './css/Tooltip.css'; 

const Tooltip = ({account}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='profile'>
      <div><i className="far fa-user icon" /></div>
      <div>My profile</div>
      </div>
      
      {isHovered && (
        
        
        <div className='tooltip-content'>
         My Address: {account}
        
      </div>
      )}
    </div>
  );
};

export default Tooltip;
