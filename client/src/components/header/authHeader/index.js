import { Fragment, useContext } from 'react';
import { LoaderContext } from '../../../contexts/LoaderContext';
import Logo from '../../logo';
import WebMenu from '../../menu/webMenu';
import styles from './AuthHeader.module.css';
const AuthHeader = ()=>{
    const [loader, setLoader] = useContext(LoaderContext)
    return (
        <header id={styles.header} className="header">
            <Logo />
            {loader ? <Fragment /> : 
            <WebMenu />}
        </header>
    )
}

export default AuthHeader