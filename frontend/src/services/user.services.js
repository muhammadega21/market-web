import axios from "axios";

export function getUser(callback) {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
