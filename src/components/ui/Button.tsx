import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'advisor';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`${styles.base} ${styles[variant]} ${styles[size]} ${className || ''}`}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
