import { Link } from "react-router-dom";

function Form({
  children,
  FormLabel,
  FormButtonLabel,
  LinkLabel,
  LinkUrl,
  onSubmit,
}) {
  return (
    <div className="flex justify-center items-center h-[100dvh]">
      <div className="bg-white py-5 px-6 w-3/4 md:w-1/3 text-center shadow-sm rounded">
        <h1 className="text-xl font-semibold">{FormLabel}</h1>
        <form onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-3 text-sm font-semibold w-full rounded mt-3 mb-2"
          >
            {FormButtonLabel}
          </button>
        </form>
        <Link
          to={LinkUrl}
          className="bg-slate-600 text-white py-2 px-3 text-sm font-semibold w-full flex justify-center rounded "
        >
          {LinkLabel}
        </Link>
      </div>
    </div>
  );
}

export default Form;
