import { useEffect, useState } from "react";
import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardSubtitle, CardBody, Row, Col, CardHeader} from 'reactstrap';






const MyPageCards = (props: any) => {

  //used in case no picture set in the card 
  function errorHandling(ev: any){
    ev.target.src =  'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg';
  }

  return ( 
    <div>
      <Card style={{width: 810,  height: 255, backgroundColor: "#f5f5f5"}}>
        <CardBody id="container-MyPageCards" >
          <div className="img1">
          <CardImg src={props.listingItem.photoURL} alt="card image" style={{width: 286, height: 255, padding: 10, borderRadius: 10}} 
          onError = {errorHandling}
          /> 
          </div>
          <div className="description" style={{padding: 15}}>
          <CardTitle style={{fontSize: 25}} tag="h5">{props.listingItem.title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{props.listingItem.description}</CardSubtitle>
          </div>
        </CardBody>
      </Card>

      </div>
    );
  };
 
export default MyPageCards;