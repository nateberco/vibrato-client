import React, { useState, useEffect } from 'react';
import HomeGalleryChild from './HomeGalleryChild';
import {CardDeck, Container, Col, Row} from 'reactstrap';
import APIURL from '../../helpers/environment';
import BrowseBar from '../home/BrowseBar';



const HomeGalleryParent = (props:any) => {

    const [listings, setListings] = useState([])
    const [category, setCategory] = useState('')
    
    
    const fetchProducts = () => {
        fetch(`${APIURL}/listing/`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        }) 
        .then( (res) => res.json())
        .then((listingData) => {
            console.log(listingData);
            // ******* if
            if (category === "All" || category === "") {
                setListings(listingData);
              } else {
                const categoryArray = listingData.filter((x: any) => {
                    return x.category === category
                })
                // console.log(categoryArray, category)
                setListings(categoryArray);
              }
            // ***************** 
            // const categoryArray = listingData.filter((x: any) => {
            //     return x.category === category
            // })
            // setListings(categoryArray);
            // ******** end new

            // setListings(listingData);
        })
    }

    const updateCategory = (category: any) => {
        setCategory(category)
        fetchProducts();
    }
    
    useEffect(()=>{
        fetchProducts();
    }, [category]); 
    

    function displayCards(){
        return listings.length > 0 ? listings.map(listings => <HomeGalleryChild fetchProducts={fetchProducts} updateToken={props.updateToken} token={props.token} listingItem = {listings} />) : null;
    }


    return (    
        <> 
        <BrowseBar 
             updateCategory={updateCategory} 
        />
        <div className="gallery-div">    

                <CardDeck className="cardDeckCss" style={{justifyContent: 'center', width: "auto" , marginBottom: 20,}}>
                    {displayCards()}
                </CardDeck>
                
       </div>
        </>
    )
};


 
export default HomeGalleryParent;