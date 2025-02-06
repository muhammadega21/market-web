import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../services/user.services";

function Sidebar() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Get User Login
  useEffect(() => {
    getUser((data) => {
      setUser(data);
    });
  }, []);
  //   Logout
  function handleLogout() {
    axios.post("http://localhost:8000/api/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("token");
    navigate("/login");
  }
  const location = useLocation();
  return (
    <div className="w-20 sm:w-56 bg-white fixed top-0 h-screen">
      <div className="h-10 flex items-center justify-center">
        <h1 className="text-lg font-semibold">Market-Web</h1>
      </div>
      <div className="side-link flex flex-col my-6">
        <Link
          to={"/dashboard"}
          className={location.pathname == "/dashboard" && "active"}
        >
          <i className="bx bxs-dashboard"></i>
          <span>Dashboard</span>
        </Link>
        <Link
          to={"/product"}
          className={location.pathname == "/product" && "active"}
        >
          <i className="bx bx-package"></i>
          <span>Product</span>
        </Link>
        {user.user_role == "admin" && (
          <Link
            to={"/user"}
            className={location.pathname == "/user" && "active"}
          >
            <i className="bx bx-user"></i>
            <span>User</span>
          </Link>
        )}

        <Link onClick={handleLogout}>
          <i className="bx bx-log-out"></i>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
