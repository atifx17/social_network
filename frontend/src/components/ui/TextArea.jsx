export default function TextArea({ label, value, onChange, className = "" }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
      />
    </div>
  );
}
