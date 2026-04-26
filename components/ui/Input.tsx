import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[10px] uppercase tracking-[0.3em] text-muted-fg mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full h-12 bg-transparent border-b border-foreground focus:border-accent outline-none transition-colors duration-500 font-sans text-sm placeholder:font-serif placeholder:italic placeholder:text-muted-fg ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
