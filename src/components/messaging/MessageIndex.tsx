import React, { useState, useEffect } from 'react';
import {Button, Container, Row, Col, CardDeck} from 'reactstrap';
import MessageCreate from './MessageCreate';




const MessageIndex = (props: any) => {

    const [conversations, setConversations] = useState<Conversation>();
    const [messages, setMessages] = useState<ViewMessageResponse>();

    const getConversations = () => {
        fetch('http://localhost:3000/message/viewConversationList', {
            method: 'GET',
            headers:new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then( (res) => res.json())
        .then((Messages) => {
            setConversations(Messages);
            console.log('list of product from index -->', Messages);
        })
    }



    useEffect( () => {
        getConversations();
    }, [])

    function viewMessage (id: number) {
            fetch(`http://localhost:3000/message/viewMessages/${id}`, {
                method: 'GET',
                headers:new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': props.token
                })
            })
            .then( (res) => res.json())
            .then((Messages) => {
                setMessages(Messages);
                console.log('list of messages from index -->', Messages);
            })
        }



    return ( 
        <>
<h6 className='font-italic' style={{color: "#91a597"}}>My Messages</h6>

        <Container>
            <Row>
                <Col md="3">
            
                    <MessageCreate getMessages={getConversations} token={props.token}/>
                   <ul>
                       {conversations!==undefined ? 
                       conversations.conversation.map((conversation, index) => {
                           return(
                               <li onClick={ ()=> viewMessage(conversation.id)}> 
                               
                                   {conversation.id}
                               </li>
                           )
                       }): null }
                   </ul>
                   <br/>
                   <ul>
                       {messages!==undefined ? 
                       messages.messages.map((message, index) => {
                           return(
                               <li 
                               // onClick={ ()=> viewMessage(message.id)} -- in case you want to edit, delete, etc
                               >
                                   {message.content}
                               </li>
                           )
                       }): null }
                   </ul>
                </Col>
            
            </Row>
            <br/>
        </Container>
        </>
     );
}
 
export default MessageIndex;






    export interface User {
        id: number;
        username: string;
        password: string;
        address?: any;
        latitude?: any;
        longitude?: any;
        role: string;
        social?: any;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface Conversation {
        id: number;
        senderId: number;
        recipientId: number;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface Message {
        id: number;
        content: string;
        conversationGroupId: number;
        ownerId: number;
        createdAt: Date;
        updatedAt: Date;
        conversationId: number;
    }

    export interface Conversation {
        user: User[];
        conversation: Conversation[];
        messages: Message[];
    }


// MESSAGES

export interface ViewMessage {
    id: number;
    content: string;
    conversationGroupId: number;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
    conversationId: number;
}

export interface ViewMessageResponse {
    messages: ViewMessage[];
    userId: number;
}
