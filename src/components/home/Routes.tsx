import React, { useState, useEffect } from "react";
import { Route, Switch} from "react-router-dom";

import SiteBar from "./Sitebar";
import Home from "./Home";
import ListingIndex from "../listing/ListingIndex";
import Auth from '../auth/Auth';
import HomeGalleryParent from '../listing/HomeGalleryParent';



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
          sessionToken  ? <ListingIndex token={sessionToken}  
          /> : 
          <Auth updateToken={updateToken}/>
          
        )
    }

    return ( 
        <>
        <SiteBar />
        
        <Switch>

            {/* <Route exact path="/">
                <Home />
            </Route> */}
            
            <Route exact path="/">
                <HomeGalleryParent />
            </Route>
            <Route exact path="/myListings">
                {protectedViews()}
            </Route>
        </Switch>
        
        </>
     )
}
 
export default Routes;