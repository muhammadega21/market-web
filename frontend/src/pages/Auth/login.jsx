import { Helmet } from "react-helmet";
import Form from "../../components/Auth/Form";
import FormInput from "./../../components/Auth/FormInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastError from "../../components/Alerts/ToastError";
import AlertSuccess from "../../components/Alerts/AlertSuccess";
import { ThreeDot } from "react-loading-indicators";

function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:8000/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (res) {
        const token = res.data.access_token;
        localStorage.setItem("token", token);
        AlertSuccess(res.data.message, () => navigate("/dashboard"));
      })
      .catch(function (err) {
        if (err.response && err.response.data) {
          ToastError("Gagal Login");
          setError(
            err.response.data.message || "Login failed. Please try again."
          );
        } else {
          setError("An error occurred. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  }
  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <Form
        FormLabel={"Form Login"}
        FormButtonLabel={
          loading ? (
            <ThreeDot color="#fff" size="small" text="" textColor="" />
          ) : (
            "Login"
          )
        }
        LinkLabel={"Register"}
        LinkUrl={"/register"}
        onSubmit={handleSubmit}
      >
        <FormInput
          label={"Email"}
          type={"email"}
          id={"email"}
          placeholder={"yourmail@gmail.com"}
          icon={"bxs-envelope"}
          value={data.email}
          error={!!error.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        {error.email && (
          <span className="text-red-500 text-start block text-sm mt-0.5">
            {error.email}
          </span>
        )}
        <FormInput
          label={"Password"}
          type={"password"}
          id={"password"}
          placeholder={"password"}
          icon={"bxs-lock-alt"}
          value={data.password}
          error={!!error.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        {error.password && (
          <span className="text-red-500 text-start block text-sm mt-0.5">
            {error.password}
          </span>
        )}
      </Form>
    </>
  );
}

export default LoginPage;
