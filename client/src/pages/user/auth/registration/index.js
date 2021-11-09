import Head from "next/head";
import styles from "./Register.module.css";
import AuthLayout from "../../../../layouts/AuthLayout";
import FormComponent from "../../../../components/formComponents";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../../../contexts/UserContext";

export const SubmitBtnExtra = () => (
  <Link href="/user/auth/login">Already have account? Login here </Link>
);

const Registration = () => {
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [returnValue, setReturnValue] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (success && returnValue) {
      localStorage.setItem("token", returnValue.refreshToken);
      setUser(returnValue.data.user);
    }
  }, [success, returnValue]);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (user.role === "user") {
        router.push("/user/dashboard");
      } else {
        return;
      }
    }
  }, [user]);

  const formBuilder = [
    {
      fieldType: "TextField",
      placeholder: "Name",
      label: "Name",
      initFocus: true,
      maxChar: 32,
      minChar: 2,
      isRequired: true,
      fieldName: "name",
    },
    {
      fieldType: "EmailField",
      placeholder: "Email",
      label: "Email",
      initFocus: false,
      isRequired: true,
      fieldName: "email",
    },
    // { fieldType: 'PasswordField', initFocus: false, maxChar: 100, minChar: 8, isRequired: true, fieldName: 'password'},
    {
      fieldType: "PasswordWithConfirmField",
      placeholder: "Password",
      label: "Password",
      initFocus: false,
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
      <Head>Registration form</Head>
      <div className="content">
        <div id={styles.register}>
          <h1 className="heading">Registration</h1>
          <div id={styles.registerContent}>
            <FormComponent
              setSuccess={setSuccess}
              setReturnValue={setReturnValue}
              submitValue="Signup"
              reason="registration"
              reqType="post"
              url="users/signup"
              formBuilder={formBuilder}
              submitBtnExtra={<SubmitBtnExtra />}
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Registration;
