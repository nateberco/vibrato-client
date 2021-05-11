import "./Home.css";
import logo from '../../Assets/ParkGuitarWeb_LG.gif';
import {
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem,
    Dropdown
  } from 'reactstrap';

  import React, { useState } from "react";
  import DropdownCategory from './DropdownCategory';

const BrowseBar = (props) => {

    //start category dropdown items

    const categories = [
      {
        id: 1,
        value: 'Gear',
      },
      {
        id: 2,
        value: 'Service',
      },
      {
        id: 3,
        value: 'All',
      }

    ]
    //end category dropdown items

    return (
        <div className="BrowseBarDiv">
            <img className="Logo" src={logo} alt="" />
            <div>
            {/* START */}
            <div className="container">
              < DropdownCategory title="Category" categories={categories} updateCategory={props.updateCategory} />
            </div>
            {/* END */ }
            </div>
        </div>
    );
};

export default BrowseBar;