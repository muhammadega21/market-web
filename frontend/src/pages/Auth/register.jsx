import { Helmet } from "react-helmet";
import Form from "../../components/Auth/Form";
import FormInput from "../../components/Auth/FormInput";

function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      <Form
        FormLabel={"Form Register"}
        FormButtonLabel={"Register"}
        LinkLabel={"Login"}
        LinkUrl={"/login"}
      >
        <FormInput
          label={"Name"}
          type={"text"}
          id={"name"}
          placeholder={"Your Name"}
          icon={"bxs-user"}
        />
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

export default RegisterPage;
