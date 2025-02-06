import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../services/user.services";

function Navbar() {
  const [user, setUser] = useState("");

  // Get User Login
  useEffect(() => {
    getUser((data) => {
      setUser(data);
    });
  }, []);

  return (
    <div className="w-[calc(100%-80px)] sm:w-[calc(100%-224px)] h-12 bg-white ms-auto shadow-md px-2">
      <div className="h-full flex justify-end items-center gap-3">
        <div className="flex flex-col text-end leading-5 text-sm">
          <span>{user.name}</span>
          <span className=" text-gray-600">{user.user_role}</span>
        </div>
        <div>
          <img
            src={
              user.user_profile == "images/user.png"
                ? "http://localhost:8000/" + user.user_profile
                : "http://localhost:8000/storage/" + user.user_profile
            }
            alt={user.name}
            className="w-9 h-9 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
