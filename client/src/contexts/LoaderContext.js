import React, { createContext, useState } from 'react';

export const LoaderContext = createContext();

export const LoaderProvider = (props)=>{
    const [loader, setLoader] = useState(true);

    return(
        <LoaderContext.Provider value={[loader, setLoader]} >
            { props.children }
        </LoaderContext.Provider>
    )
}