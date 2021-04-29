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
  Button
} from 'reactstrap';

import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import './Home.css'

const Sitebar = (props: any) => {

  const [showLogOut, setShowLogOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionToken, setSessionToken] = useState("");

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
    e.preventDefault()
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
                >Home</NavLink>
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
          </Nav>
          <NavbarBrand style={{color: "#f57e7e", fontSize: "20px"}} href="/"onMouseOver={changeLink} 
              onMouseLeave={resetLink} size="sm" onClick={clearToken} >Log Out</NavbarBrand>
          {/* <NavLink to="/">
          <Button onMouseOver={changeLink} 
              onMouseLeave={resetLink} size="sm" onClick={clearToken} >Log out</Button>
          </NavLink> */}
           
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Sitebar;



// import React, { useState, useEffect } from "react";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   Button,
//   NavbarText

// } from 'reactstrap';

// import { Link } from "react-router-dom";
// import './Home.css'


// const Sitebar = (props: any) => {

//   const [showLogOut, setShowLogOut] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => {
//     let newIsOpen = !isOpen;
//     setIsOpen(newIsOpen);
//   };


//   // Hover effect on buttons
//   function changeLink(e: any) {
//     // e.target.style.fontWeight = 'bold';
//     e.target.style.color = '#f7e1d7';
//   }

//   function resetLink(e: any) {
//     // e.target.style.fontWeight = 'normal';
//     e.target.style.color = 'black';
//   }

//   useEffect(() => {
//     if (localStorage.getItem("sessionToken")) {
//         setShowLogOut(true);
//     }
//   }, [showLogOut]);


//   return (
    
//       <Navbar 
//       className="navbarCss" 
//       dark expand="md"
//       >
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav 
//           className="ml-auto mr-auto" navbar
//           >
//             <NavItem>
//               <Link
//                 onMouseOver={changeLink} onMouseLeave={resetLink}
//                 style={{ color: "black" }}
//                 //className="text-decoration-none pl-5"
//                 to="/"
//               >
//                 Home
//               </Link>
//               <Link
//                 onMouseOver={changeLink} onMouseLeave={resetLink}
//                 style={{ color: "black" }}
//                 //className="text-decoration-none pl-5"
//                 to="/myListings"
//               >
//                 My Listings
//               </Link>         
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>
      
      
    
//   );
// };


// export default Sitebar;