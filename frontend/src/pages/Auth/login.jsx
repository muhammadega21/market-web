import { Helmet } from "react-helmet";
import Form from "../../components/Auth/Form";
import FormInput from "./../../components/Auth/FormInput";

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <Form
        FormLabel={"Form Login"}
        FormButtonLabel={"Login"}
        LinkLabel={"Register"}
        LinkUrl={"/register"}
      >
        <FormInput
          label={"Email"}
          type={"email"}
          id={"email"}
          placeholder={"yourmail@gmail.com"}
          icon={"bxs-envelope"}
        />
        <FormInput
          label={"Password"}
          type={"password"}
          id={"password"}
          placeholder={"password"}
          icon={"bxs-lock-alt"}
        />
      </Form>
    </>
  );
}

export default LoginPage;
