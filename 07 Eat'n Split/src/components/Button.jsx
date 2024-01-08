import React from "react";

function Button({ children, ...rest }) {
  return (
    <button className="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
