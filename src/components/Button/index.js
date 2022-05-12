const Button = ({ type, children, onClick, ...rest }) => {
  return (
    <button onClick={onClick} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
