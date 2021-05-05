import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody
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
    <div>
      <Navbar light expand="md">
        <NavbarBrand style={{color: "#f57e7e", fontSize: "40px"}} href="/">Vibrato</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem id="sitebarHome">
              <NavLink id="sitebarHome"onMouseOver={changeLink} onMouseLeave={resetLink}
                to="/"
                >Browse</NavLink>
            </NavItem>
           
            
            <UncontrolledDropdown id="sitebarHome" style={{marginLeft: "50px", marginTop: "2px"}} nav inNavbar>
              <DropdownToggle nav caret onMouseOver={changeLink} onMouseLeave={resetLink} 
              >
                Listing Type
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Gear
                </DropdownItem>
                <DropdownItem>
                  Services
                </DropdownItem>
                <DropdownItem divider />   
                <DropdownItem>
                  Gear & Services
                </DropdownItem>  
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem id="sitebarHome">
              <NavLink id="sitebarHome" onMouseOver={changeLink} onMouseLeave={resetLink}
                to="/myListings"
              >My Listings</NavLink>
            </NavItem>
            <NavItem id="sitebarHome">
              <NavLink id="sitebarHome" onMouseOver={changeLink} onMouseLeave={resetLink}
                to="/messages"
              >Messages</NavLink>
            </NavItem>
          </Nav>
          <NavbarBrand style={{color: "#f57e7e", fontSize: "20px"}} href="/"onMouseOver={changeLink} 
              onMouseLeave={resetLink} size="sm" onClick={clearToken}>Log Out</NavbarBrand>
              
          {/* { !sessionToken ? <NavbarBrand style={{color: "#f57e7e", fontSize: "20px"}} onMouseOver={changeLink} 
              onMouseLeave={resetLink} size="sm" onClick={authToggle}>Log In</NavbarBrand> :

              <NavbarBrand style={{color: "#f57e7e", fontSize: "20px"}} href="/"onMouseOver={changeLink} 
              onMouseLeave={resetLink} size="sm" onClick={clearToken}>Log Out</NavbarBrand> 
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

    </div>
  );
}

export default Sitebar;
