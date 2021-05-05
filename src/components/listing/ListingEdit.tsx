import React, { useState, useEffect } from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormText} from 'reactstrap';



const ListingEdit = (props:any) => {

    
    const [editTitle, setEditTitle] = useState(props.listingToUpdate.title);
    const [editDescription, setEditDescription] = useState(props.listingToUpdate.description);
    const [editPhotoURL, setEditPhotoURL] = useState(props.listingToUpdate.photoURL);
    const [editCategory, setEditCategory] = useState(props.listingToUpdate.category);
    const [editKeywords,setEditKeywords] = useState(props.listingToUpdate.keywords);
 

    //to close modal form in case we change our mind
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeButton = <button className="close" onMouseOver={changeBtn} onMouseLeave={resetBtn} onClick={toggle}>&times;</button>;

    // Hover effect on buttons
    function changeBtn(e: any) {
    e.target.style.fontSize = 'larger';
    }

    function resetBtn(e: any) {
    e.target.style.fontSize = 'initial';
    }


    /* **********
    CLOUDINARY
    *********** */
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e: { target: { files: any; }; }) => {
        const data = new FormData();
        const files = e.target.files;
        data.append('file', files[0]);
        data.append('upload_preset', 'vibrato');
        setLoading(true);
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/natescloudinary/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json();

        setEditPhotoURL(file.secure_url);
        setLoading(false);
    }

    /* **********
    END CLOUDINARY
    *********** */
 

    const listingUpdate = (event: any) => {
        event.preventDefault();

        fetch(`http://localhost:3000/listing/edit/${props.listingToUpdate.id}`, {
            method:'PUT',
            body: JSON.stringify({
                    title: editTitle, 
                    description: editDescription, 
                    photoURL: editPhotoURL,
                    category: editCategory,
                    keywords: editKeywords,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then((res) => {
            props.getListings();
            props.updateOff();
        })
    }

    function deleteImg(){
        setEditPhotoURL('');
    }

    return ( 
        <>
        <Modal isOpen={true} toggle={toggle}>
             <Form onSubmit={listingUpdate}>
                <ModalHeader style={{marginLeft: "auto", backgroundColor: "#f7e1d7"}} close={closeButton} toggle={toggle}> 
                    Edit your Listing
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label htmlFor="title">Edit Title</Label>
                        <Input title="title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="description">Edit Description</Label>
                        <Input type="textarea" name="description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}/>
                    </FormGroup>

                {/* START CLOUDINARY          */}
                <FormGroup>
                    <Label htmlFor="photoURL">Upload Image</Label> 
                    <Input type="file" onChange={uploadImage} />
                    <br/>
                    {loading ? <h6>Loading...</h6> : <img src={editPhotoURL} style={{width:   '150px', height:   '150px'  }} />} {' '}
                    <Button size= 'sm' color='outline-danger' disabled={loading} onClick={deleteImg}>Delete Image</Button>
                </FormGroup>  
                    {/* END CLOUDINARY          */}   

                <FormGroup className="category">
                <Label htmlFor="category">Category
                        <br/>
                        {/* <Input name="category" value={category} onChange={(e) => setKeywords(e.target.value)} /> */}
                        <input className="radioOptions"
                            type="radio"
                            value={editCategory}
                            name="content"
                            id="show"
                            onClick={() => setEditCategory("Gear")}
                            // checked={category === "Gear"}
                            />
                            <label htmlFor="show">Gear</label>
                        <br/>
                            <input className="radioOptions"
                            type="radio"
                            value={editCategory}
                            name="content"
                            id="hide"
                            onClick={() => setEditCategory("Service")}
                            // checked={category === "Service"}
                            />
                            <label htmlFor="hide">Service</label>
                    </Label>
                </FormGroup>

                <FormGroup>
                        <Label htmlFor="keywords">Edit Keywords</Label>
                        <Input type="textarea" name="keywords" value={editKeywords} onChange={(e) => setEditKeywords(e.target.value)}/>
                </FormGroup>
                                    
            </ModalBody>
            <ModalFooter style={{justifyContent: 'center', backgroundColor: "#f7e1d7"}}>
                <Button disabled={loading} onMouseOver={changeBtn} onMouseLeave={resetBtn} onClick={toggle} type="submit">Update!</Button>
            </ModalFooter>
            </Form>
        </Modal>
        </>
     );
}
 
export default ListingEdit;     