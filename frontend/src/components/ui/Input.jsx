export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  className = ""
}) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
      />
    </div>
  );
}
