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
                    <textarea 
                    style={{width: "100%", height: 40, textAlign: "center", marginLeft: "AUTO", marginRight: "50px"}}
                    name="message" value={content} onChange={(e) => setContent(e.target.value)}/>
                </FormGroup>
                <Button 
                style={{backgroundColor: "rgb(21, 68, 50)", color: "white", width: 130, height: 40, textAlign: "center", marginLeft: "5px", marginRight: "0", marginTop: "32px"}}
                type="submit">Send Message</Button>
            </Form>
        </>
     );
}

export default MessageCreate;
