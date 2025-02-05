import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";

function Dashboard() {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fethUser() {
      try {
        const res = await axios.get("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fethUser();
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>
      <p>Welcome {user.name}</p>
    </>
  );
}

export default Dashboard;
