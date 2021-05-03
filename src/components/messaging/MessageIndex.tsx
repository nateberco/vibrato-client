import React, { useState, useEffect } from 'react';
import {Button, Container, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody, ListGroup, ListGroupItem} from 'reactstrap';
import MessageCreate from './MessageCreate';
import MessageRespond from './MessageRespond';

import './Message.css'; 




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

        // MODAL FOR OPENING CONVOS
        const {
            classModal
          } = props;

          const [modal, setModal] = useState(false);

          const toggle = () => 
          setModal(!modal);
            



    return ( 
        <>
<h6 className='font-italic' style={{color: "#91a597"}}>My Messages</h6>

        <Container>
            
            
            {/* <MessageCreate getMessages={getConversations} token={props.token}/> */}

            <div>
            {conversations!==undefined ? 
                       conversations.conversation.map((conversation, index) => {
                           return(
                               <li onClick={ ()=> viewMessage(conversation.id)}> 
                            <div>
                                <Button color="danger" onClick={toggle}>
                                    {conversation.id}
                                </Button>
                                <Modal isOpen={modal} toggle={toggle} className={classModal}>
                                <ModalHeader toggle={toggle}>Conversation with (USERNAME??)</ModalHeader>
                                <ModalBody>
                                    <ListGroup className="message-list-group">
                                        {messages!==undefined ? 
                                        messages.messages.map((message, index) => {
                                        return(
                                        
                                        // onClick={ ()=> viewMessage(message.id)} -- in case you want to edit, delete, etc
                                        <ListGroupItem className="">
                                        {message.content}
                                        </ListGroupItem>
                                        
                                        )
                                        }): null }
                                     </ListGroup>
                                </ModalBody>
                                <ModalFooter>
                                {/* <Button color="primary" onClick={toggle}>Do Something</Button>{' '} */}
                                <div>
                                <MessageRespond className="message-respond-form" getMessages={getConversations} token={props.token}/>
                                </div>
                                </ModalFooter>
                                </Modal>
                                </div>
                                   
                                </li>
                           )
                       }): null }

            </div>
               
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
