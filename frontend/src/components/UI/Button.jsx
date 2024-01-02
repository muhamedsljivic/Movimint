import React from "react";
import classes from "./Button.module.css";

const Button = ({ onClick, children, type }) => {
  return (
    <button type={type} onClick={onClick} className={classes.button}>
      {children}
    </button>
  );
};

export default Button;
