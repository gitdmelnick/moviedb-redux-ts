import React, { MouseEvent } from "react";
import s from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: (e: MouseEvent) => void;
};

const Button = ({ children, onClick}: ButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    onClick(e);
  };

  return (
    <button onClick={handleClick} className={`${s.btn} rounded`}>
      {children}
    </button>
  );
};

export default Button;
