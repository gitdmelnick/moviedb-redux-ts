import React from 'react';
import cl from './Button.module.css';

type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
}

export const Button = ({children, ...props}: ButtonProps) => {
    return ( 
        <button {...props} className={cl.btn}>
            {children}
        </button>
     );
}

export default Button;