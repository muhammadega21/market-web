import { Helmet } from "react-helmet";
import Navbar from "../components/Pages/Navbar";
import Sidebar from "../components/Pages/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../services/user.services";
import AlertConfirm from "../components/Alerts/AlertConfirm";
import { ThreeDot } from "react-loading-indicators";
import Modal from "../components/Modal";
import FormInput from "../components/Auth/FormInput";

function UserPage() {
  const [loading, setLoading] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      setData({
        user: "",
      });
      setError(""); // Menghapus error juga jika ada
    }
  }, [isModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          new Promise((resolve) => {
            getUser((userData) => {
              setData((prevData) => ({ ...prevData, user: userData.name }));
              resolve();
            });

            getAllUsers((allUsersData) => {
              setUsers(allUsersData);
              resolve;
            });
          }),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update User
  async function handleUpdateUser(e) {
    e.preventDefault();
    setIsProcess(true);
    try {
      Object.defineProperty(data, "_method", { value: "put" });
      const result = await updateUser(data);
      if (result.success) {
        setData({ name: "" });
        setError("");
        setIsModalOpen(false);
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to update product. Please try again.");
    } finally {
      setIsProcess(false);
    }
  }

  // Delete User
  function handleDeleteUser(id) {
    AlertConfirm({
      message: "It will permanently deleted !",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
      }
    });
  }

  function Loading() {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <ThreeDot color="#1681ba" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>User Page</title>
      </Helmet>
      <Navbar />
      <Sidebar />
      <div className="w-[calc(100%-80px)] sm:w-[calc(100%-224px)] h-full ms-auto p-6">
        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="relative mx-4 mt-8 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
            <div className="flex items-center justify-between gap-8">
              <div className="flex w-full justify-between">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Users list
                </h5>
                <div className="w-full md:w-72">
                  <div className="relative h-10 w-full min-w-[200px]">
                    <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </div>
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Search
                    </label>
                  </div>
                </div>
              </div>
              {/* modal */}
              <div className="modal">
                <Modal
                  modalTitle={"Edit User"}
                  onSubmit={handleUpdateUser}
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  modalButton={
                    isProcess ? (
                      <ThreeDot
                        color="#fff"
                        size="small"
                        text=""
                        textColor=""
                      />
                    ) : (
                      "Update"
                    )
                  }
                >
                  <FormInput
                    label={"Name"}
                    type={"text"}
                    id={"name"}
                    placeholder={"Name"}
                    icon={"bx-user"}
                    value={data.name}
                    error={!!error.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                  {error.name && (
                    <span className="text-red-500 text-start block text-sm mt-0.5">
                      {error.name}
                    </span>
                  )}
                </Modal>
              </div>
            </div>
          </div>
          <div className="pt-6 px-0 overflow-auto">
            <table className="w-full mt-4 text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th className="p-4 transition-colors border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      No
                    </p>
                  </th>
                  <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Username
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        />
                      </svg>
                    </p>
                  </th>
                  <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Role
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        />
                      </svg>
                    </p>
                  </th>
                  <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Action
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search) ||
                            item.role.toLowerCase().includes(search);
                    })
                    .map((user, index) => (
                      <tr key={index}>
                        <td className="p-4 border-b border-blue-gray-50">
                          {index + 1}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {user.name}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          {user.role}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <button
                            className="relative  w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            <span className="absolute flex gap-2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                              <button
                                className="bg-orange-600 text-white text-base px-2 py-1 rounded"
                                onClick={() => {
                                  setData({
                                    name: user.name,
                                    id: user.id,
                                  });
                                  setIsEditMode(true);
                                  setIsModalOpen(true);
                                }}
                              >
                                <i className="bx bx-edit"></i>
                              </button>
                              <button
                                className="bg-red-600 text-white text-base px-2 py-1 rounded"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <i className="bx bx-trash"></i>
                              </button>
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center">
                      User Kosong.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
