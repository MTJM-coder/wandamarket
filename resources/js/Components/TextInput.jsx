import React from 'react';

export default function TextInput({ type = 'text', name, value, className = '', autoComplete, isFocused = false, handleChange, required, placeholder }) {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <input
      type={type}
      name={name}
      value={value}
      ref={inputRef}
      autoComplete={autoComplete}
      required={required}
      placeholder={placeholder}
      className={
        'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' + className
      }
      onChange={(e) => handleChange(e)}
    />
  );
}
