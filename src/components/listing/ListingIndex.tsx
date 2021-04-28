import React, { useState, useEffect } from 'react';
import {Container, Row, Col} from 'reactstrap';
import ListingPublish from './ListingPublish';


const ListingIndex = (props: any) => {

    const [listings, setListings] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [listingToUpdate, setListingToUpdate] = useState({});

    const getListOfProducts = () => {
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
            console.log('list of product from index -->', Listings);
        })
    }

    // const editUpdateProduct = (product: any) => {
    //     setProductToUpdate(product);
    //     console.log(product);
    // }

    // const updateOn = () => {
    //     setUpdateActive(true);
    // }

    // const updateOff = () => {
    //     setUpdateActive(false);
    // }


    useEffect( () => {
        getListOfProducts();
    }, [])


    return ( 
        <>

        <Container>
            <Row>
                <Col md="3">
                
                    <ListingPublish getListOfProducts={getListOfProducts} token={props.token}/>
                   
                </Col>
                {/* <Col md="9" className='text-center'>
                    <ProductView getListOfProducts={getListOfProducts} productList={productList} editUpdateProduct={editUpdateProduct} updateOn={updateOn} token={props.token}/>
                </Col>
                <Col>
                {updateActive ? <ProductEdit productToUpdate={productToUpdate} updateOff={updateOff} token={props.token} getListOfProducts={getListOfProducts}/> : <></>}
                </Col> */}
            </Row>
            <br/>
        </Container>
        </>
     );
}
 
export default ListingIndex;