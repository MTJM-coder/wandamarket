export default function InputLabel({ htmlFor, value, className = '', children }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block font-medium text-sm text-gray-700 ${className}`}
    >
      {value ?? children}
    </label>
  );
}
