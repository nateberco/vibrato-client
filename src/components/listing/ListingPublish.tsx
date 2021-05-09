import React, { useState, useEffect } from 'react';
import {Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
import './Listing.css';
import APIURL from '../../helpers/environment';


const ListingPublish = (props: any) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [category, setCategory] = useState('');
    const [keywords, setKeywords] = useState('');

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

        setPhotoURL(file.secure_url);
        setLoading(false);
    }

    /* **********
    END CLOUDINARY
    *********** */

    const handleSubmit = (e: React.SyntheticEvent) => {

        e.preventDefault();
        fetch(`${APIURL}/listing/publish` , {
            method: 'POST',
            body: JSON.stringify({
                
                    title: title,
                    description: description,
                    photoURL: photoURL,
                    category: category,
                    keywords: keywords
                
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then( (res) => res.json())
        .then( (logData) => {
            console.log('logData -->', logData);
            setTitle('');
            setDescription('');
            setPhotoURL('');
            setCategory('');
            setKeywords('');
            props.getListings()
        })
        
        .catch((err => { console.log(err);}))
    }

    function deleteImg(){
        setPhotoURL('');
    }

    // const onValueChange = (e: any) => {
    //     e.target.value === 'category' ? setCategory('Gear') : setCategory("Service");
    //     console.log('e.target.value', e.target.value);
    // }

    return ( 
        <div className="listingWrapper">
            <Container className="listingForm-wrapper">
            <h4 className="listingHeader">New Listing?</h4>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="title">
                    <Label htmlFor="title">Title</Label>
                    <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </FormGroup>

                <FormGroup className="description">
                    <Label htmlFor="description">Description</Label>
                    <textarea className="descriptionInput" name='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                </FormGroup>
                <FormGroup className="category">
                    <Label htmlFor="category">Category
                        <br/>
                        {/* <Input name="category" value={category} onChange={(e) => setKeywords(e.target.value)} /> */}
                        <input className="radioOptions"
                            type="radio"
                            value={category}
                            name="content"
                            id="show"
                            onClick={() => setCategory("Gear")}
                            // checked={category === "Gear"}
                            />
                            <label htmlFor="show">Gear</label>
                        <br/>
                            <input className="radioOptions"
                            type="radio"
                            value={category}
                            name="content"
                            id="hide"
                            onClick={() => setCategory("Service")}
                            // checked={category === "Service"}
                            />
                            <label htmlFor="hide">Service</label>
                            </Label>
                </FormGroup>


                {/* START CLOUDINARY */}
                <FormGroup>
                    <Label htmlFor="photoURL">Upload image</Label>
                    <Input type="file" onChange={uploadImage} />
                    {loading ? <h6>Loading...</h6> : <img src={photoURL} style={{width:'120px'}} alt=""/> } 
                    <br/>
                    <Button size= 'sm' color='outline-danger' disabled={loading || photoURL===''} onClick={deleteImg} >Delete image</Button>
                </FormGroup>  

                <br />
                <div className='submit'>
                <Button className="listingButton"   
                    type="submit">List it!</Button>
                </div>
            </Form>
            </Container>
        </div>
     );
}

export default ListingPublish;

// INTERFACES

export interface ListingPublishProps {
    id: number;
    title: string;
    description: string;
    photoURL: string;
    category: string;
    keywords: string;
    userId: number;
    updatedAt: Date;
    createdAt: Date;
}


