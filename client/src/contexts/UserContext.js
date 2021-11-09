import React, { createContext, useState, useContext, useEffect } from 'react';
import { LoaderContext } from './LoaderContext';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useContext(LoaderContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const token = localStorage.getItem('token');

        if (token) {
          // const data = await axios({
          //   url: `${process.env.NEXT_PUBLIC_API}/api/v1/users/authenticate`,
          //   withCredentials: true,
          //   data: { token },
          // });
          const data = await fetch(
            `http://localhost:5002/api/v1/users/authenticate`,
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }),
            }
          );

          data.json().then((datas) => {
            console.log(datas);
            setUser(datas);
          });

          return setLoader(false);
        }

        return setLoader(false);
      } catch (err) {
        console.log('e', err);
        setUser(null);
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
