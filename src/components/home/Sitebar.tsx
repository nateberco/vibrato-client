import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText

} from 'reactstrap';

import { Link } from "react-router-dom";
import './Home.css'



const Sitebar = (props: any) => {

  
  const [showLogOut, setShowLogOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    // e.target.style.fontWeight = 'normal';
    e.target.style.color = 'black';
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
        setShowLogOut(true);
    }
  }, [showLogOut]);



  return (
    
      <Navbar 
      className="navbarCss" 
      dark expand="md"
      >
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav 
          className="ml-auto mr-auto" navbar
          >
            <NavItem>
              
              <Link
                onMouseOver={changeLink} onMouseLeave={resetLink}
                style={{ color: "black" }}
                //className="text-decoration-none pl-5"
                to="/"
              >
                Home
              </Link>
              <Link
                onMouseOver={changeLink} onMouseLeave={resetLink}
                style={{ color: "black" }}
                //className="text-decoration-none pl-5"
                to="/myListings"
              >
                My Listings
              </Link>         
            </NavItem>
          </Nav>
        </Collapse>
        
      </Navbar>
      
      
    
  );
};

////////



export default Sitebar;