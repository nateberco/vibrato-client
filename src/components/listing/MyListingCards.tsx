import { useEffect, useState } from "react";
import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardSubtitle, CardBody, Row, Col, CardHeader} from 'reactstrap';
import MyListingsView from './MyListingsView';





const MyPageCards = (props: any) => {

  //used in case no picture set in the card 
  function errorHandling(ev: any){
    ev.target.src =  'https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg';
  }

  return ( 
    <div>
      <Card id="container-MyPageCards" style={{width: 450,  height: 450}}>
        <CardBody >
        <CardTitle id="myTitle" style={{fontSize: 30}}>{props.listingItem.title}</CardTitle>
        <CardText id="category2">
             {props.listingItem.category}</CardText>
          <div className="img1">
          <CardImg src={props.listingItem.photoURL} alt="card image" style={{width: 200, height: 200, padding: 10}} 
          onError = {errorHandling}
          /> 
          </div>
          <div style={{padding: 15}}>
          
          <CardSubtitle id="description2" >
            {props.listingItem.description}</CardSubtitle>
            <br />
          
          </div>
          
        </CardBody>
      </Card>

      </div>
    );
  };
 
export default MyPageCards;