import { useState, useEffect } from "react";
function Input({
  label,
  placeholder,
  type,
  oneline,
  value,
  onChange,
  min,
  max,
}) {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };
  return (
    <div className={`col-span-2 ${oneline ? "" : "sm:col-span-1"}`}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type}
        name={label}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-600 dark:focus:border-orange-600"
        placeholder={placeholder}
        required=""
        value={inputValue}
        onChange={handleChange}
        min={min}
        max={max}
      />
    </div>
  );
}

export default Input;
