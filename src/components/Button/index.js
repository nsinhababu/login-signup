const Button = ({ type, children, onClick }) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
