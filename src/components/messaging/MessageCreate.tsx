import React, { useState, useEffect } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import APIURL from '../../helpers/environment';


const MessageCreate = (props: any) => {

    const [content, setContent] = useState('');

    
    const handleSubmit = (e: any) => {

        e.preventDefault();
        fetch(`${APIURL}/message/send/${props.ownerId}` , {
            method: 'POST',
            body: JSON.stringify({
                    content: content, 
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then( (res) => res.json())
        .then( (messageData) => {
            console.log('Message -->', messageData);
            setContent('');
        })
        .catch((err => { console.log(err);}))

    }

    return ( 
        <>
            
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="message">your message:</Label>
                    <textarea name="message" value={content} onChange={(e) => setContent(e.target.value)}/>
                </FormGroup>
                <Button type="submit">Send Message</Button>
            </Form>
        </>
     );
}

export default MessageCreate;
