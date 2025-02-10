import { useRef, useEffect } from "react";

function Modal({
  children,
  modalTitle,
  modalButton,
  onSubmit,
  isOpen,
  setIsOpen,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl"
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                {modalTitle}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
              >
                ✖
              </button>
            </div>
            <form onSubmit={onSubmit}>
              {/* Body Modal */}
              <div className="p-4">{children}</div>

              {/* Footer Modal */}
              <div className="flex justify-end p-4 border-t">
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
                >
                  {modalButton}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-3 bg-gray-200 text-gray-900 px-5 py-2 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
