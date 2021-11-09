import List from '../../../../components/list-model';
import AdminLayout from '../../../../layouts/AdminLayout';
import styles from './Users.module.css';

const Users = () => {
  return (
    <AdminLayout>
      <List
        model="Users"
        url="users"
        singlePageUrl="admin/users"
        data1="name"
        data2="email"
        heading="Users' List"
      />
    </AdminLayout>
  );
};

// export const getServerSideProps = async context =>{

//     const response = await axios({
//         method: 'get',
//         url: 'http://localhost:8082/api/v1/users',
//         headers: { cookie: context.req.headers.cookie }
//     })

//     return {props:{users: response.data.data.data}}

// }

export default Users;
