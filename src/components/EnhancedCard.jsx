import React from 'react';

const EnhancedCard = ({ 
  children, 
  className = '', 
  hover = true, 
  clickable = false, 
  onClick,
  ...props 
}) => {
  const baseClasses = 'bg-card border rounded-lg transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1' : '';
  const clickableClasses = clickable ? 'cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default EnhancedCard;
