import Head from "next/head";
import styles from "./ForgotPassword.module.css";
import AuthLayout from "../../../../layouts/AuthLayout";
import FormComponent from "../../../../components/formComponents";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export const SubmitBtnExtra = () => (
  <Fragment>
    <Link href="/user/auth/login">Login</Link>
    <br />
    <Link href="/user/auth/registration">Don't have account? </Link>
  </Fragment>
);

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [returnValue, setReturnValue] = useState(null);

  useEffect(() => {
    if (success && returnValue) {
      setMessage(returnValue.message);
    }
  }, [success, returnValue]);

  const formBuilder = [
    {
      fieldType: "EmailField",
      placeholder: "Email",
      label: "Email",
      initFocus: true,
      isRequired: true,
      fieldName: "email",
    },
  ];

  return (
    <AuthLayout>
      <Head>Forgot Password</Head>
      <div className="content">
        <div id={styles.forgotPassword}>
          <h1 className="heading">Forgot Password</h1>
          <div id={styles.forgotPasswordContent}>
            <h5 className="heading success-message">{message}</h5>
            <FormComponent
              setSuccess={setSuccess}
              setReturnValue={setReturnValue}
              submitValue="Reset Password"
              reason="forgot password"
              reqType="post"
              url="users/forgotPassword"
              formBuilder={formBuilder}
              submitBtnExtra={<SubmitBtnExtra />}
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
