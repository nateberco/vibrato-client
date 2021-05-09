import { useEffect, useState } from "react";
import React from 'react';
import { withRouter } from "react-router-dom";
import { Card, Button, CardImg, CardTitle, CardText, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, CardDeck, Row } from 'reactstrap';
import MessageCreate from '../messaging/MessageCreate';
import Auth from  '../auth/Auth';
import APIURL from '../../helpers/environment';
import userEvent from "@testing-library/user-event";

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
    e.target.src = 'https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg';
  }

  function changeBtn(e: any) {
    e.target.style.fontSize = 'larger';
  }

  function resetBtn(e:any) {
    e.target.style.fontSize = 'initial';
  }

  /* **** START Admin Delete **** */
  const adminDeleteListing = (id: any) => {
    fetch(`${APIURL}/listing/deleteAdmin/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => {
      console.log("Admin deleted listing succesffully")
      props.fetchProducts();
      
    });
  };

    /* **** END Admin Delete **** */


    return ( 
     
      <div >
      <CardDeck className="cardDeckCss">
      <Card className="CardCss">
        <CardBody className="CardBody">
          <CardTitle className="child-card-title">{props.listingItem.title}</CardTitle>
        <CardImg className="child-card-image" src={props.listingItem.photoURL} alt="Card image" 
        onError = {errorHandling} 
        />
          <Button className="gallery-description-button" style={{background: "#f57e7e"}} onMouseOver={changeBtn} onMouseLeave={resetBtn} onClick={toggle}>{buttonLabel}See Full Description</Button> 
        </CardBody>
      </Card>
      <br/>
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
          { localStorage.getItem('role') === "Admin" ? 

          <Button 
          style={{backgroundColor: "#4a5759", color: "white", width: 150, height: 40, textAlign: "center", marginLeft: "auto", marginRight: "auto"}} 
          onMouseOver={changeBtn} onMouseLeave={resetBtn} 
          // onClick={adminDeleteListing}
          onClick={() => {
            adminDeleteListing(props.listingItem.id);
          }}
          >
            Admin Delete
          </Button>: null

          }
          { props.token ? <Button onClick={() => setShowMessageBox(!showMessageBox)} >Message Seller</Button> : null}
          { !props.token ? <Button style={{background: "#4A5759"}} onMouseOver={changeBtn} onMouseLeave={resetBtn} onClick={metaToggle}>{buttonLabel}Sign in or Register HERE to Message Seller</Button> : null}
          
          {showMessageBox? <MessageCreate ownerId={props.listingItem.userId} token={props.token} /> :null}

          {/* {showMessageBox? <MessageCreate ownerId={props.listingItem.userId} token={props.token} /> 
            : <Button style={{background: "#4A5759"}} onMouseOver={changeBtn} onMouseLeave={resetBtn} onClick={metaToggle}>{buttonLabel}Sign in or Register HERE to Message Seller</Button> } */}

        </ModalFooter>
      </Modal>

      </CardDeck>
    </div>

    );
};

 
export default HomeGalleryChild;