import React, { useEffect } from 'react';
import Auth from '../auth/Auth';


const LogOut = (props) => {

    const clearToken = () => {
        localStorage.clear();
        props.setSessionToken('');
        props.setUsername('');
        console.log("Logged out");
    };

    useEffect(() => {
        clearToken()
    }, ); // add [] before closing paren ??

    return ( 
        <>
        <Auth updateToken={props.updateToken} updateUsername={props.updateUsername}/>
        </>

     );
}
 
export default LogOut;