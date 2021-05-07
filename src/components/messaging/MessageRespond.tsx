import React, { useState, useEffect } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './Message.css'; 


const MessageRespond = (props: any) => {

    const [content, setContent] = useState('');

    
    const handleSubmit = (conversation: any) => {

        conversation.preventDefault();
        fetch(`http://localhost:3000/message/send/${props.replyTo}` , {
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
            props.viewMessage();
        })
        .catch((err => { console.log(err);}))

    }

    return ( 
        <>
            
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <textarea className="message-respond-text-box" name="message" value={content} onChange={(e) => setContent(e.target.value)}/>
                </FormGroup>
                <Button className="message-button-respond" type="submit">Reply</Button>
            </Form>
        </>
     );
}

export default MessageRespond;