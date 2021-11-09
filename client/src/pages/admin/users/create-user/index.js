import Head from "next/head";
import styles from "./CreateUser.module.css";
import FormComponent from "../../../../components/formComponents";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";

export const SubmitBtnExtra = () => (
  <Fragment>
    {/* <Link href="/user/auth/login">Already have account? Login here </Link> */}
  </Fragment>
);

const CreateUser = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [returnValue, setReturnValue] = useState(null);

  useEffect(() => {
    if (success && returnValue) {
      setMessage("User created successfully");
    }
  }, [success, returnValue]);

  const formBuilder = [
    {
      fieldType: "CustomTypeTextField",
      placeholder: "user or admin or moderator",
      label: "User Type",
      customTypesArray: ["user", "admin", "moderator"],
      initFocus: true,
      maxChar: 32,
      minChar: 2,
      isRequired: true,
      fieldName: "role",
    },
    {
      fieldType: "TextField",
      placeholder: "Name",
      label: "Name",
      initFocus: false,
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
    <AdminLayout>
      <Head>
        <title>User Create</title>
      </Head>
      <div className="content">
        <div id={styles.register}>
          <h1 className="heading">Create User or Admin</h1>
          <div id={styles.registerContent}>
            <h5 className="heading success-message">{message}</h5>
            <FormComponent
              setSuccess={setSuccess}
              setReturnValue={setReturnValue}
              submitValue="Create"
              reason="registration from admin"
              reqType="post"
              url="admin/users/create"
              formBuilder={formBuilder}
              submitBtnExtra={<SubmitBtnExtra />}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateUser;
