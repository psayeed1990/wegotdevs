import { useContext, useEffect } from "react";
import { apiCall } from "../../../../api";
import WebLayout from "../../../../layouts/WebLayout";
import {UserContext} from './../../../../contexts/UserContext';
import {useRouter} from 'next/router';

const Logout = ()=>{
    const router = useRouter();
    const [user, setUser] = useContext(UserContext);

    useEffect(()=>{
        if(user){
            const logout = async()=>{
                const logout = await apiCall('GET', 'users/logout', 'logout');
                localStorage.removeItem("token");
                setUser(null);
                return router.push('/user/auth/login')
            }
            logout();
        }

    },[])
    
    return(
        <WebLayout>
        <div className="content">
        {user?
            <h1 classname="heading">Logging out...</h1>
            :
            <h1 className="heading">Logged out</h1>
        }
        </div>
        </WebLayout>
    )
}

export default Logout;