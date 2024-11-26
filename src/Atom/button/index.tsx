import React from "react";
import './button.scss';

interface ButtonProps {
  buttonText?: string;
  externalClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  type?: "button" | "submit" | "reset"; 
  disabled?: boolean; 
  unicode?: string;
}

export const Button: React.FC<ButtonProps> = ({
  buttonText = "Click Me",
  externalClassName = "",
  onClick = () => {},
  type = "button", 
  disabled = false, 
  unicode = ""
}) => {
  return (
    <button
      type={type}
      className={`button-style w-[100%] ${externalClassName}`}
      onClick={onClick}
      disabled={disabled} // Disable the button if the prop is true
    >
      {buttonText} <span className="unicode">{unicode}</span>
    </button>
  );
};


