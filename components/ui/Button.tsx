import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  href,
  ...props 
}: ButtonProps) => {
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-sans font-medium uppercase tracking-[0.2em] text-xs transition-all duration-500 cursor-pointer";
  
  const sizeStyles = {
    sm: "h-10 px-6",
    md: "h-12 px-8",
    lg: "h-14 px-10",
  };

  const variants = {
    primary: "bg-foreground text-background shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] group",
    secondary: "border border-foreground text-foreground hover:bg-foreground hover:text-background",
    ghost: "bg-transparent text-foreground hover:bg-muted-bg",
    link: "bg-transparent text-foreground hover:text-accent underline-offset-4 hover:underline lowercase tracking-normal text-sm normal-case",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`;

  const renderContent = () => {
    if (variant === 'primary') {
      return (
        <>
          <span className="absolute inset-0 bg-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
          <span className="relative z-10 transition-colors duration-500 group-hover:text-background font-medium">
            {children}
          </span>
        </>
      );
    }
    return children;
  };

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {renderContent()}
    </button>
  );
};

