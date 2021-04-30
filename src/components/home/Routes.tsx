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
    const [username, setUsername] = useState("");
    
    useEffect(() => {
        if (localStorage.getItem("token")) {
        setSessionToken(localStorage.getItem('token') || '{}');
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("username")) {
            setUsername(localStorage.getItem("username")|| '{}');
        }
    }, []);


    const updateToken = (newToken: any) => {
        localStorage.setItem("token", newToken);
        setSessionToken(newToken);
        console.log(sessionToken);
    };

    const updateUsername = (newUsername: any) => {
        localStorage.setItem("username", newUsername);
        setUsername(newUsername);
        console.log(username);
    };

    const protectedViews = () => {
        return (
          sessionToken ? <ListingIndex 
                            token={sessionToken} 
                            username={username} 
                            /> : 
                        <Auth 
                            updateToken={updateToken} 
                            updateUsername={updateUsername}/>
                    )
                }

    return ( 
        <>
        <Router history={history} >
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