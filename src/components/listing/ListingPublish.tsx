import React, { useState, useEffect } from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

const ListingPublish = (props: any) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [category, setCategory] = useState('');
    const [keywords, setKeywords] = useState('');

    const handleSubmit = (e: any) => {

        e.preventDefault();
        fetch(`http://localhost:3000/listing/publish` , {
            method: 'POST',
            body: JSON.stringify({
                product:{
                    title: title,
                    description: description,
                    photoURL: photoURL,
                    category: category,
                    keywords: keywords
                }
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
            // props.getListings();

        })
        .catch((err => { console.log(err);}))
    }

    const onValueChange = (e: any) => {
        e.target.value === 'category' ? setCategory('Gear') : setCategory("Service");
        console.log('e.target.value', e.target.value);
    }

    return ( 
        <>
            <h4>New Listing?</h4>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="title">Title</Label>
                    <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input name='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                </FormGroup>
        
                    
                    <FormGroup >
                    <Label htmlFor="category">Gear or Service?</Label>
                        <Input type="radio" name="category" value='Service' defaultchecked onChange={(e) => onValueChange(e)}/>{' '}
                        type
                    
                </FormGroup>
                    <FormGroup >
                    <Label >
                        <Input name="category" value={category} onChange={(e) => setKeywords(e.target.value)} />
                    </Label>
                    </FormGroup>


                {/* START CLOUDINARY          */}
                {/* <FormGroup>
                    <Label htmlFor="photoURL">Upload image</Label>
                    <Input type="file" onChange={uploadImage} />
                    {loading ? <h6>Loading...</h6> : <img src={photoURL} style={{width:'120px'}} style={{height:'120px'}} alt=""/> } 
                    <br/>
                    <Button size= 'sm' color='outline-danger' disabled={loading || photoURL===''} onClick={deleteImg} >Delete image</Button>
                </FormGroup>   */}
                    {/* END CLOUDINARY          */}
                    

                {/* <FormGroup check>
                    <Label htmlFor='publish' check>
                    <Input type="checkbox" value={publish} onChange={(e) => setPublish(e.target.value)} />{' '}
                    Publish?
                    </Label>
                </FormGroup> */}
                <br />
                <div className='align-middle text-center'>
                <Button  
                    style={{width: 120, backgroundColor: "#f5f5f5", color: "black"}} 
                    // disabled={loading} 
                    // onMouseOver={changeBtn} 
                    // onMouseLeave={resetBtn} 
                    type="submit">List it!</Button>
                </div>
            </Form>
        </>
     );





}

export default ListingPublish;