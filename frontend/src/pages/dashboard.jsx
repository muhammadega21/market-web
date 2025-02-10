import { Helmet } from "react-helmet";
import Navbar from "./../components/Pages/Navbar";
import Sidebar from "./../components/Pages/Sidebar";

function Dashboard() {
  // const [user, setUser] = useState([]);
  // const token = localStorage.getItem("token");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   async function fethUser() {
  //     try {
  //       const res = await axios.get("http://localhost:8000/api/user", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setUser(res.data.data);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   }
  //   fethUser();
  // }, [token]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Navbar />
      <Sidebar />
      <div className="w-[calc(100%-80px)] sm:w-[calc(100%-224px)] h-full ms-auto p-6">
        <h1>Dashboard</h1>
      </div>
    </>
  );
}

export default Dashboard;
