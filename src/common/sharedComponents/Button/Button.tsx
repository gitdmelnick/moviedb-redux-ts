import React from "react";
import s from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={s.btn}>
      {children}
    </button>
  );
};

export default Button;
