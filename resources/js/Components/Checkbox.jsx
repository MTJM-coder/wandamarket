export default function Checkbox({ name, checked, onChange, className = '', ...props }) {
  return (
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className={`rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ${className}`}
      {...props}
    />
  );
}
