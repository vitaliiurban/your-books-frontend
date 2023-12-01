function Input() {
  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <div className="mt-1">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${
            error && !password ? "border-red-300" : ""
          }`}
          onChange={handlePasswordChange}
        />
      </div>
      <p
        className={`mt-2 text-sm text-red-600 ${
          error && !password ? "" : "hidden"
        }`}
        id="password-error"
      >
        Please fill out this field.
      </p>
    </div>
  );
}

export default Input;
