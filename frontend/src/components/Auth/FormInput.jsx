function FormInput({ label, type, id, placeholder, icon }) {
  return (
    <div className="mt-3">
      <label
        htmlFor={id}
        className="block mb-2 text-sm text-start font-medium "
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <i className={"bx " + icon + " text-xl text-gray-500"}></i>
        </div>
        <input
          type={type}
          id={id}
          className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default FormInput;
