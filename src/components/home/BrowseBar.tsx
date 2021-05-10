import "./Home.css";
import logo from '../../Assets/ParkGuitarWeb_LG.gif';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

const BrowseBar = () => {

      // Hover effect on buttons
  function changeLink(e: any) {
    // e.target.style.fontWeight = 'bold';
    e.target.style.color = '#f7e1d7';
  }

  function resetLink(e: any) {
    e.target.style.fontWeight = 'normal';
    e.target.style.color = '#315f72';
  }


    return (
        <div className="BrowseBarDiv">
            <img className="Logo" src={logo} alt="" />
            <div>
            <UncontrolledDropdown id="browsebar-dropdown" style={{ color: "white"}} >
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
        
            </div>
        </div>
    );
};

export default BrowseBar;