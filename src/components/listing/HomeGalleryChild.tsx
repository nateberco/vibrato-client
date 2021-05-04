import { useEffect, useState } from "react";
import React from 'react';
import { withRouter } from "react-router-dom";
import { Card, Button, CardImg, CardTitle, CardText, CardSubtitle, CardBody, Row, Col,  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MessageCreate from '../messaging/MessageCreate';
import Auth from  '../auth/Auth';


const HomeGalleryChild = (props: any) => {

  const {
    buttonLabel,
    className
  } = props;

  // to display the close button on Modal form
  const [modal, setModal] = useState(false);
  const [metaModal, setMetaModal] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);

  const toggle = () => setModal(!modal);
  const metaToggle = () => setMetaModal(!metaModal)

//   used in case no picture set in the card 
  function errorHandling(e: any){
    e.target.src = 'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg';
  }

  function changeBtn(e: any) {
    e.target.style.fontSize = 'larger';
  }

  function resetBtn(e:any) {
    e.target.style.fontSize = 'initial';
  }


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
          <Button style={{background: "#4A5759"}} onMouseOver={changeBtn} onMouseLeave={resetBtn} onClick={toggle}>{buttonLabel}See Full Description</Button> 
        </CardBody>
      </Card>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader style={{backgroundColor: "#f7e1d7" , textAlign: "center", height: 90, borderRadius: 10}} toggle={toggle}>
          {props.listingItem.title}
        </ModalHeader>
        <Row className="justify-content-center">
        <img src={props.listingItem.photoURL} alt="listing" width="370" height="310" style={{padding:20}} onError = {errorHandling}/>
        </Row>
        <ModalBody style={{textAlign: "center"}}>
          <CardText>
            {props.listingItem.description}{' '}
          </CardText>
        <CardText tag="h6" className="mb-2 text-muted">Category: {props.listingItem.category}</CardText>

{/* START META AUTH MODAL */}
<Modal isOpen={metaModal} toggle={metaToggle} className={className}>
        <ModalHeader style={{backgroundColor: "#f7e1d7" , textAlign: "center", height: 90, borderRadius: 10}} toggle={metaToggle}>
          HEADER
        </ModalHeader>
        <ModalBody style={{textAlign: "center"}}>

          <Auth 
              updateToken={props.updateToken} 
              updateUsername={props.updateUsername}
              metaToggle={metaToggle}
              origin="gallery"
          />

        </ModalBody>
        
      </Modal>

{/* END META AUTH MODAL */}

        </ModalBody>
        <ModalFooter style={{backgroundColor: "#f7e1d7", marginLeft: 0, marginRight: 0}}>
        {/* TERNARY TO OPEN MESSAGING OR LOG IN/REGISTER !!! */}
          <Button 
          style={{backgroundColor: "#4a5759", color: "white", width: 150, height: 40, textAlign: "center", marginLeft: "auto", marginRight: "auto"}} 
          onMouseOver={changeBtn} onMouseLeave={resetBtn} onClick={toggle}>Close</Button>{' '}
          { props.token ? <Button onClick={() => setShowMessageBox(!showMessageBox)} >Message Seller</Button> : null}
          { !props.token ? <Button style={{background: "#4A5759"}} onMouseOver={changeBtn} onMouseLeave={resetBtn} onClick={metaToggle}>{buttonLabel}Sign in or Register HERE to Message Seller</Button> : null}
          
          {showMessageBox? <MessageCreate ownerId={props.listingItem.userId} token={props.token} /> :null}

          {/* {showMessageBox? <MessageCreate ownerId={props.listingItem.userId} token={props.token} /> 
            : <Button style={{background: "#4A5759"}} onMouseOver={changeBtn} onMouseLeave={resetBtn} onClick={metaToggle}>{buttonLabel}Sign in or Register HERE to Message Seller</Button> } */}

        </ModalFooter>
      </Modal>

     

    </div>

    );
};

 
export default HomeGalleryChild;