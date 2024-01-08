function Button({ icon, text, className, ...rest }) {
  return (
    <button {...rest} className={className}>
      {icon}
      {text}
    </button>
  );
}

export default Button;
