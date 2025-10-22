import React from 'react';
import { Loader2 } from 'lucide-react';

const EnhancedButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary hover:scale-[1.02] active:scale-[0.98] hover:shadow-md',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-primary hover:scale-[1.02] active:scale-[0.98] hover:shadow-md',
    ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-primary hover:scale-[1.02] active:scale-[0.98]',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg'
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg'
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
        isDisabled ? 'transform-none hover:scale-100 active:scale-100' : ''
      }`}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processando...
        </>
      ) : (
        <>
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          {children}
        </>
      )}
    </button>
  );
};

export default EnhancedButton;
