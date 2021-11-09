import { Fragment, useContext } from 'react';
import { LoaderContext } from '../../../contexts/LoaderContext';
import Logo from '../../logo';
import AdminMenu from '../../menu/adminMenu';
import styles from './AdminHeader.module.css';
const AdminHeader = ()=>{
    const [loader, setLoader] = useContext(LoaderContext)
    return (
        <header id={styles.header} className="header">
            <Logo />
            {loader ? <Fragment /> : 
            <AdminMenu />}
        </header>
    )
}

export default AdminHeader