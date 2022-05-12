const Input = ({ type, name, value, onChange, ...rest }) => {
  return (
    <input
      name={name}
      type={type}
      id={name}
      placeholder={`Enter your ${name}`}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Input;
