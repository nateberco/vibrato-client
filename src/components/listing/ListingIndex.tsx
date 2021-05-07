import React, { useState, useEffect } from 'react';
import {Button, Container, Row, Col, CardDeck} from 'reactstrap';
import ListingPublish from './ListingPublish';
import MyListingsView from './MyListingsView';
import ListingEdit from './ListingEdit';
import './Listing.css';



const ListingIndex = (props: any) => {

    const [listings, setListings] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [listingToUpdate, setListingToUpdate] = useState({});

    const getListings = () => {
        fetch('http://localhost:3000/listing/viewShop', {
            method: 'GET',
            headers:new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then( (res) => res.json())
        .then((Listings) => {
            setListings(Listings);
            console.log('Listings in this shop -->', Listings);
        })
    }

    const editUpdateListing = (listing: any) => {
        setListingToUpdate(listing);
        console.log(listing);
    }

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    useEffect( () => {
        getListings();
    }, [])

    //USE THESE TO DISPLAY USERNAME OF SHOP !!
    function whoIsConnected(){
        localStorage.getItem("user.username");
    }

    useEffect(() => {
        whoIsConnected()
    }, []);


    return ( 
        <>
        <h1 className="usernameListings">{localStorage.getItem("username")}'s Listings</h1>
        <Container>
            <Row>
                <Col md="8">
            
                <MyListingsView getListings={getListings} listings={listings} 
                    editUpdateListing={editUpdateListing} updateOn={updateOn} token={props.token}
                    />
                </Col>
                <Col md="3" className='text-center'>
                <ListingPublish getListings={getListings} token={props.token} username={props.username}/>  

                    {updateActive ? <ListingEdit listingToUpdate={listingToUpdate} updateOff={updateOff} token={props.token} getListings={getListings}/> : <></>}
                </Col>

            </Row>
            <br/>
        </Container>
        </>
     );
}
 
export default ListingIndex;