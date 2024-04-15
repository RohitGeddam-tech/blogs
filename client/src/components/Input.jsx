import React from "react";

const Input = ({ error, value, label, name, disabled, handleChange, type="text" }) => {
  return (
    <div className={`textInput`}>
      <input
        type={type}
        aria-label={name}
        className="input"
        value={value !== null ? value : ""}
        name={name}
        onChange={handleChange}
        disabled={disabled}
      />
      {label !== "" && (
        <label htmlFor={name} className="input-placeholder">
          {label}
        </label>
      )}
      {error && error !== "" ? <p className="error-text">{error}</p> : null}
    </div>
  );
};

export default Input;
