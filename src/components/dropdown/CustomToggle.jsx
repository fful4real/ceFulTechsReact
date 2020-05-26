import React from 'react'

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span 
        className="no-caret"  
        data-toggle="dropdown" 
        aria-expanded="false" 
        role="button"
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </span>
  ));