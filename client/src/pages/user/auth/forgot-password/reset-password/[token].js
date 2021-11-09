import Head from "next/head";
import styles from "./ResetPassword.module.css";
import AuthLayout from "../../../../../layouts/AuthLayout";
import FormComponent from "../../../../../components/formComponents";
import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../../../../contexts/UserContext";

export const SubmitBtnExtra = () => (
  <Fragment>
    <br />
  </Fragment>
);

const ResetPassword = () => {
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [returnValue, setReturnValue] = useState(null);
  const router = useRouter();
  const { token } = router.query;

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
      fieldType: "PasswordWithConfirmField",
      placeholder: "Password",
      label: "Password",
      initFocus: true,
      maxChar: 100,
      minChar: 8,
      isRequired: true,
      fieldName: "password",
      otherFieldName: "passwordConfirm",
    },
    {
      fieldType: "PasswordConfirmField",
      placeholder: "Password Confirm",
      label: "Password Confirm",
      initFocus: false,
      maxChar: 100,
      minChar: 8,
      isRequired: true,
      fieldName: "passwordConfirm",
      otherFieldName: "password",
    },
  ];

  return (
    <AuthLayout>
      <Head>Change Password</Head>
      <div className="content">
        <div id={styles.resetPassword}>
          <h1 className="heading">Login</h1>
          <div id={styles.resetPasswordContent}>
            <FormComponent
              setSuccess={setSuccess}
              setReturnValue={setReturnValue}
              submitValue="Reset Password"
              reason="reset password"
              reqType="post"
              url={`users/resetPassword/${token}`}
              formBuilder={formBuilder}
              submitBtnExtra={<SubmitBtnExtra />}
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
