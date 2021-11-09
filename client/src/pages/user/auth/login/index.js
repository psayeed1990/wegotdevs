import Head from "next/head";
import styles from "./Login.module.css";
import AuthLayout from "../../../../layouts/AuthLayout";
import FormComponent from "../../../../components/formComponents";
import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../../../contexts/UserContext";

export const SubmitBtnExtra = () => (
  <Fragment>
    <Link href="/user/auth/forgot-password">Forgot password?</Link>
    <br />
    <Link href="/user/auth/registration">Don't have account? </Link>
  </Fragment>
);

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [returnValue, setReturnValue] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (success && returnValue) {
      localStorage.setItem("token", returnValue.refreshToken);
      console.log(returnValue);
      setUser(returnValue.data.user);
    }
  }, [success, returnValue]);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        return router.push("/admin/dashboard");
      } else if (user.role === "user") {
        return router.push("/user/dashboard");
      } else {
        return;
      }
    } else {
      return;
    }
  }, [user]);

  const formBuilder = [
    {
      fieldType: "EmailField",
      placeholder: "Email",
      label: "Email",
      initFocus: true,
      isRequired: true,
      fieldName: "email",
    },
    {
      fieldType: "PasswordField",
      placeholder: "Password",
      label: "Password",
      initFocus: false,
      maxChar: 100,
      minChar: 8,
      isRequired: true,
      fieldName: "password",
    },
  ];

  return (
    <AuthLayout>
      <Head>Login form</Head>
      <div className="content">
        <div id={styles.login}>
          <h1 className="heading">Login</h1>
          <div id={styles.loginContent}>
            <FormComponent
              setSuccess={setSuccess}
              setReturnValue={setReturnValue}
              submitValue="Login"
              reason="login"
              reqType="post"
              url="users/login"
              formBuilder={formBuilder}
              submitBtnExtra={<SubmitBtnExtra />}
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
