import { useEffect, useState } from "react";
import React from 'react';
import { withRouter } from "react-router-dom";
import { Card, Button, CardImg, CardTitle, CardText, CardSubtitle, CardBody, Row, Col,  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const HomeGalleryChild = (props: any) => {

  const {
    buttonLabel,
    className
  } = props;

  // to display the close button on Modal form
//   const [modal, setModal] = useState(false);
//   const toggle = () => setModal(!modal);

//   used in case no picture set in the card 
  function errorHandling(e: any){
    e.target.src = 'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg';
  }

//   function changeBtn(e: { target: { style: { fontSize: string; }; }; }) {
//     e.target.style.fontSize = 'larger';
//   }

//   function resetBtn(e: { target: { style: { fontSize: string; }; }; }) {
//     e.target.style.fontSize = 'initial';
//   }


    return ( 
     
      <div className="Cards">
      <Card className="CardCss" 
         style={{textAlign: "center" , width: '350px', height: "450px", padding: "0px", marginBottom: 20, boxShadow: " lightGrey 2px 2px"}}
        >
        <CardImg src={props.listingItem.photoURL} alt="Card image" height="350" 
        onError = {errorHandling} 
        />
        <CardBody className="CardBody" style = {{background: "white"}} >
          <CardTitle tag="h5" style={{fontSize: 17}}>{props.listingItem.title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{props.listingItem.description}</CardSubtitle>
          
          {/* <Button style={{background: "#4A5759"}} onMouseOver={changeBtn} onMouseLeave={resetBtn} onClick={toggle}>{buttonLabel}See Full Description</Button>  */}
        </CardBody>
      </Card>
     

        </div>

      );
    };

 
export default HomeGalleryChild;