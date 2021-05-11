import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Col,
  NavItem,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Row
} from 'reactstrap';

import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import './Home.css'
import Auth from '../auth/Auth';



const Sitebar = (props: any) => {
  const {
    className
  } = props;

  const [showLogOut, setShowLogOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionToken, setSessionToken] = useState("");

  const [authModal, setAuthModal] = useState(false);

  const authToggle = () => setAuthModal(!authModal)

  let history = useHistory();

  const toggle = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  // Hover effect on buttons
  function changeLink(e: any) {
    // e.target.style.fontWeight = 'bold';
    e.target.style.color = '#f7e1d7';
  }

  function resetLink(e: any) {
    e.target.style.fontWeight = 'normal';
    e.target.style.color = '#315f72';
  }

  useEffect(() => {
    if (localStorage.getItem("sessionToken")) {
        setShowLogOut(true);
    }
  }, [showLogOut]);

  const clearToken = (e: { preventDefault: () => void; }) => {
    localStorage.clear();
    setSessionToken('');
    console.log("Logged out");
    history.push("/")
  }

  return (
    
    <div className="sitebar">
      <Container>
      <Navbar light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
              <NavItem id="sitebarHome">
                <NavLink id="sitebarHome" onMouseOver={changeLink} onMouseLeave={resetLink}
                  to="/"
                  >Browse</NavLink>
              </NavItem>
              <NavItem id="sitebarHome" >
                <NavLink id="sitebarHome" onMouseOver={changeLink} onMouseLeave={resetLink}
                  to="/messages"
                >Messages</NavLink>
              </NavItem>
              <div className="nav-logout">
              <NavItem id="sitebarHome">
                <NavLink id="sitebarHome" onMouseOver={changeLink} onMouseLeave={resetLink}
                  to="/myListings"
                >My Listings</NavLink>
              </NavItem>
              <NavbarBrand id="sitebarHome"  style={{color: "#f57e7e", fontSize: "20px"}} href="/"onMouseOver={changeLink} 
              onMouseLeave={resetLink} size="sm" onClick={clearToken}>Log Out</NavbarBrand>
              </div>  
          </Nav>
          
              
          {/* { !sessionToken ? 
              <NavbarBrand style={{color: "#f57e7e", fontSize: "20px"}} href="/"onMouseOver={changeLink} 
              onMouseLeave={resetLink} size="sm" onClick={clearToken}>Log Out</NavbarBrand> : null
              } */}
  
        </Collapse>
      </Navbar>

      {/* START META AUTH MODAL */}
<Modal isOpen={authModal} toggle={authToggle} className={className}>
        <ModalHeader style={{backgroundColor: "#f7e1d7" , textAlign: "center", height: 90, borderRadius: 10}} toggle={authToggle}>
          Auth
        </ModalHeader>
        <ModalBody style={{textAlign: "center"}}>

          <Auth 
              updateToken={props.updateToken} 
              updateUsername={props.updateUsername}
              metaToggle={authToggle}
          />
        </ModalBody> 
      </Modal>
      {/* END META AUTH MODAL */}
      </Container>
      <NavbarBrand id="brand" href="/">Vibrato</NavbarBrand>
    </div>
  );
}

export default Sitebar;
