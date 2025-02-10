import axios from "axios";
import AlertSuccess from "../components/Alerts/AlertSuccess";
import ToastError from "../components/Alerts/ToastError";

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

export function getAllUsers(callback) {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:8000/api/users", {
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

export async function updateUser(data) {
  try {
    console.log(data);

    const token = localStorage.getItem("token");
    const res = await axios.post(
      `http://localhost:8000/api/user/${data.id}`,
      { name: data.name, _method: "put" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    AlertSuccess(res.data.message, () => location.reload());
    return { success: true, data: res.data };
  } catch (err) {
    ToastError(err.response.data.message.name);
    console.log(err);

    const errorMessage =
      err.response.data.message ||
      "Failed to update from to db. Please try again.";

    return { success: false, error: errorMessage };
  }
}

export async function deleteUser(id) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`http://localhost:8000/api/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    AlertSuccess(res.data.message, () => location.reload());
  } catch (err) {
    ToastError(err.response.data.message);

    const errorMessage =
      err.response.data.message ||
      "Failed to delete data from db. Please try again.";

    return { success: false, error: errorMessage };
  }
}
