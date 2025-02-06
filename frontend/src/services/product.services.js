import axios from "axios";

export function getProduct(callback) {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:8000/api/products", {
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
