import React, {Fragment, useContext} from 'react';
import Footer from '../components/footer';
import AdminHeader from '../components/header/adminHeader';
import AuthHeader from '../components/header/authHeader';
import UserHeader from '../components/header/userHeader';
import { LoaderContext } from '../contexts/LoaderContext';
import { UserContext } from '../contexts/UserContext';

const WebLayout = ({children})=>{
    const [loader, setLoader] = useContext(LoaderContext)
    const [user, setUser] = useContext(UserContext);

    return (
        
        <Fragment>
            {!loader && user ? 
            
                <Fragment>
                    {user.role === 'admin' ? <AdminHeader /> : <UserHeader /> }
                </Fragment>
            
                :  <AuthHeader />}
           
                <main>{children}</main>
            <Footer />
        </Fragment>

        
    )
}

export default WebLayout;