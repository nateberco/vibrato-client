import React, { useState, useEffect } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';


const MessageCreate = (props: any) => {

    const [content, setContent] = useState('');
    // const [conversationGroupId, setConversationGroupId] = useState(0);
    // const [ownerId, setOwnerId] = useState(0)




    const handleSubmit = (e: any) => {

        e.preventDefault();
        fetch(`http://localhost:3000/message/send/${props.ownerId}` , {
            method: 'POST',
            body: JSON.stringify({
                    content: content, 
                    // conversationGroupId: conversationGroupId, 
                    // ownerId: ownerId,
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
                    <Label htmlFor="name">Content</Label>
                    <Input name="name" value={content} onChange={(e) => setContent(e.target.value)}/>
                </FormGroup>
                <Button type="submit">Send Message</Button>
            </Form>
        </>
     );
}

export default MessageCreate;
