import React, {useState} from 'react';
import { isPropertySignature, isTemplateTail } from 'typescript';
import "./Home.css"
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
  } from 'reactstrap';

  import logo from '../../Assets/ParkGuitarWeb_LG.gif';



function DropdownCategory(props ) {
    const [selection, setSelection] = useState([])


function handleOnClick(category) {
    if (!selection.some(current => current.id === category.id)) {
            setSelection([category])
            props.updateCategory(category.value);
            // console.log(category)
            

    } else {
        let selectionAfterRemoval = selection;
        selectionAfterRemoval = selectionAfterRemoval.filter(
            current => current.id !== category.id
        );
        setSelection([...selectionAfterRemoval]);
    }
    }

function isCategoryInSelection(category) {
    if (selection.find(current => current.id === category.id)) {
        return true;
    }
    return false;
}

return (
    <div className="dd-wrapper">

      <UncontrolledDropdown id="browsebar-dropdown" >
              <DropdownToggle id="browsebar-dropdown-header" nav caret 
              >
                Listing Category
              </DropdownToggle>
              <DropdownMenu className="browsebar-dropdown-menu" right>
              {props.categories.map(category => (
                            <li className="dd-list-item"key={category.id}>
                                <button type="button" onClick={() => handleOnClick(category)}>
                                    <span>{category.value}</span>
                                    <span id="selection-indicator">{isCategoryInSelection(category) && 
                                    <img id="selection-logo" className="Logo" src={logo} alt="" />
                                    }</span>
                                </button>
                            </li>
                        ))}  
              </DropdownMenu>
            </UncontrolledDropdown> 


    </div>
)
}


export default DropdownCategory;