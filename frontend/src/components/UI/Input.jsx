import classes from "./Input.module.css";

const Input = ({
  label,
  id,
  error,
  type,
  required,
  value,
  onChange,
  onBlur,
  hasError,
}) => {
  return (
    <div className={classes.input}>
      <label>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={hasError}
      />
      <div className={"control-error"}>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Input;
