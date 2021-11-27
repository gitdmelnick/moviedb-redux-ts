import React from 'react';
import cl from './Button.module.css';

export const Button: React.FC = ({children, ...props}) => {
    return ( 
        <button {...props} className={cl.btn}>
            {children}
        </button>
     );
}

export default Button;