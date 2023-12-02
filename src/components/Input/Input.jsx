export default function Input({ label, error, element, handleElementChange }) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id="label"
          name="label"
          type="label"
          autoComplete="label"
          required
          className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${
            error && !element ? "border-red-300" : ""
          }`}
          onChange={handleElementChange}
        />
      </div>
      <p
        className={`mt-2 text-sm text-red-600 ${
          error && !element ? "" : "hidden"
        }`}
        id="password-error"
      >
        Please fill out this field.
      </p>
    </div>
  );
}
