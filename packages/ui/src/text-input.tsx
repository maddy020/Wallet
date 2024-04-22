export const TextInput = ({
  label,
  placeholder,
  onChange,
}: {
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="pt-2">
      <label
        htmlFor=""
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  );
};
