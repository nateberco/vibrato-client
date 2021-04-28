import React, { useState, useEffect } from 'react';
import HomeGalleryChild from './HomeGalleryChild';
import {CardDeck} from 'reactstrap';



const HomeGalleryParent = (props:any) => {

    const [listings, setListings] = useState([])


    const fetchProducts = () => {
        fetch('http://localhost:3000/listing/', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        }) 
        .then( (res) => res.json())
        .then((listingData) => {
            console.log(listingData);
            setListings(listingData);
        })
    }

    
    useEffect(()=>{
        fetchProducts();
    }, []); 
    

    function displayCards(){
        return listings.length > 0 ? listings.map(listings => <HomeGalleryChild listingItem = {listings} />) : null;
    }


    return (     
        <>    
            
        <CardDeck className="cardDeckCss" style={{justifyContent: 'center', width: "auto" , marginBottom: 20}}>
            {displayCards()}
        </CardDeck>
      
       </>

    )
};


 
export default HomeGalleryParent;