import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import SiteBar from "./Sitebar";
import Home from "./Home";
import ListingIndex from "../listing/ListingIndex";
import Auth from '../auth/Auth';



const Routes = (props: any) => {

    const [sessionToken, setSessionToken] = useState("");
    
    useEffect(() => {
        if (localStorage.getItem("token")) {
        setSessionToken(localStorage.getItem('token') || '{}');
        }
    }, []);


    const updateToken = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setSessionToken(newToken);
        console.log(sessionToken);
    };


    const protectedViews = () => {
        return (
          sessionToken === localStorage.getItem('token') ? <ListingIndex token={sessionToken}  setSessionToken={setSessionToken} updateToken={updateToken} /> : 
          <Auth updateToken={updateToken}/>
          
        )
    }

    return ( 
        <>
        <SiteBar/>
        
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/myListings">
                {protectedViews()}
            </Route>
        </Switch>
        
        </>
     )
}
 
export default Routes;