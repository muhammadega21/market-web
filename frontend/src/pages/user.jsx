import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function UserPage() {
  return (
    <>
      <Helmet>
        <title>User Page</title>
      </Helmet>
      <Navbar />
      <Sidebar />
      <div className="w-[calc(100%-80px)] sm:w-[calc(100%-224px)] h-full ms-auto p-6">
        <h1>User</h1>
      </div>
    </>
  );
}

export default UserPage;
