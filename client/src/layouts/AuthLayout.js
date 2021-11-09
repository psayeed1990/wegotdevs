import { useRouter } from 'next/router';
import React, {Fragment, useContext, useEffect} from 'react';
import Footer from '../components/footer';
import AuthHeader from '../components/header/authHeader';
import { LoaderContext } from '../contexts/LoaderContext';
import { UserContext } from '../contexts/UserContext';

const AuthLayout = ({children})=>{
    const [user, setUser] = useContext(UserContext);
    const [loader, setLoader] = useContext(LoaderContext);
    const router = useRouter()

    useEffect(()=>{
        if(loader){
            return;
        }
        if(user){
            return router.push('/user/dashboard')
        }
    }, [user])

    return (
            

                <Fragment>
                    <AuthHeader />
                    { !user ?
                        <main>{children}</main>
                        :
                        <h1 className="heading">Checking user...</h1>

                    }
                    <Footer />
                </Fragment>
            

            
        
        
    )
}

export default AuthLayout;