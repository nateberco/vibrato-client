import React, { useState, useEffect } from 'react';
import {Button, Container, Row, Col, CardDeck} from 'reactstrap';
import ListingPublish from './ListingPublish';
import MyListingsView from './MyListingsView';
import ListingEdit from './ListingEdit';



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
<h6 className='font-italic' style={{color: "#91a597"}}>{localStorage.getItem("user.username")}'s Listings</h6>

        <Container>
            <Row>
                <Col md="3">
            
                    <ListingPublish getListings={getListings} token={props.token} username={props.username}/>
                   
                </Col>
                <Col md="9" className='text-center'>
                    <MyListingsView getListings={getListings} listings={listings} 
                    editUpdateListing={editUpdateListing} updateOn={updateOn} token={props.token}
                    />
                </Col>
                <Col>
                {updateActive ? <ListingEdit listingToUpdate={listingToUpdate} updateOff={updateOff} token={props.token} getListings={getListings}/> : <></>}
                </Col>
            </Row>
            <br/>
        </Container>
        </>
     );
}
 
export default ListingIndex;