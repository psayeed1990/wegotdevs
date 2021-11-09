import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from './SingleUser.module.css';
import FormComponent from '../../../../components/formComponents';
import { Fragment, useEffect, useState } from 'react';
import AdminLayout from '../../../../layouts/AdminLayout';
import { apiCall } from '../../../../api';

export const SubmitBtnExtra = () => (
  <Fragment>
    {/* <Link href="/user/auth/login">Already have account? Login here </Link> */}
  </Fragment>
);

const SingleUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [singleUser, setSingleUser] = useState(null);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [returnValue, setReturnValue] = useState(null);
  const [formBuilder, setFormBuilder] = useState(null);

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        const data = await apiCall('get', `users/${id}`, 'get user');

        setSingleUser(data.data.data);
      };

      getUser();
    }
  }, [id, success]);

  useEffect(() => {
    if (success && returnValue) {
      setMessage('User updated successfully');
    }
  }, [success, returnValue]);

  useEffect(() => {
    if (singleUser) {
      const formBuilder = [
        {
          fieldType: 'CustomTypeTextField',
          label: 'User Type',
          customTypesArray: ['user', 'admin', 'moderator'],
          initFocus: true,
          maxChar: 32,
          minChar: 2,
          isRequired: true,
          fieldName: 'role',
          value: singleUser?.role,
          placeholder: singleUser?.role,
        },
        {
          fieldType: 'TextField',
          label: 'Name',
          initFocus: false,
          maxChar: 32,
          minChar: 2,
          isRequired: true,
          fieldName: 'name',
          value: singleUser?.name,
          placeholder: singleUser?.name,
        },
        {
          fieldType: 'EmailField',
          label: 'Email',
          initFocus: false,
          isRequired: true,
          fieldName: 'email',
          value: singleUser?.email,
          placeholder: singleUser?.email,
        },
        {
          fieldType: 'TextField',
          label: 'Phone',
          initFocus: false,
          maxChar: 32,
          minChar: 4,
          isRequired: true,
          fieldName: 'phone',
          value: singleUser?.phone,
          placeholder: singleUser?.phone,
        },
      ];

      setFormBuilder(formBuilder);
    }
  }, [singleUser]);

  return (
    <AdminLayout>
      <Head>
        <title>User Update - Admin</title>
      </Head>
      <div className="content">
        {singleUser ? (
          <div id={styles.register}>
            <h1 className="heading">{singleUser.name}</h1>
            <img src="/images/icons/photo.svg" width={70} height={70} />
            <div id={styles.registerContent}>
              <h5 className="heading success-message">{message}</h5>
              <FormComponent
                setSuccess={setSuccess}
                setReturnValue={setReturnValue}
                submitValue="Update"
                reason="Update user"
                reqType="patch"
                url={`users/${id}`}
                formBuilder={formBuilder}
                submitBtnExtra={<SubmitBtnExtra />}
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </AdminLayout>
  );
};

export default SingleUser;
