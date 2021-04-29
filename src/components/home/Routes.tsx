import React, { useState, useEffect } from "react";
import { Router, Route, Switch} from "react-router-dom";
import { createBrowserHistory } from "history"

import SiteBar from "./Sitebar";
import ListingIndex from "../listing/ListingIndex";
import Auth from '../auth/Auth';
import HomeGalleryParent from '../listing/HomeGalleryParent';

const history = createBrowserHistory()

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
        <Router history={history}>
        <SiteBar history={history} />

        <Switch>
            <Route exact path="/">
                <HomeGalleryParent />
            </Route>
            <Route exact path="/myListings">
                {protectedViews()}
            </Route>
        </Switch>
        </Router>
        </>
     )
}
 
export default Routes;