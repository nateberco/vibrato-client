import React, { useState, useEffect } from 'react';
import {Button, Container, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody, ListGroup, ListGroupItem} from 'reactstrap';
import MessageRespond from './MessageRespond';
import "./Message.css";

const MessageIndex = (props: any) => {

    const [conversations, setConversations] = useState<Conversation>();
    const [messages, setMessages] = useState<ViewMessageResponse>();
    const [conversationReplyTo, setConversationReplyTo] = useState(0);
    const [currentMessageId, setCurrentMessageId] = useState(0);
    const [userId, setUserId] = useState(localStorage.getItem("userId")? Number(localStorage.getItem("userId")): 0);

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
            // set replyTo 
            console.log('list of product from index -->', Messages);
        })
    }

    useEffect( () => {
        getConversations();
    }, [])

    function viewMessage (id: number, replyToId: number) {
            
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

        // Use Effect for Refresh by time
        useEffect(()=>{
    
            // viewMessage()
            const interval = setInterval(()=>{
              viewMessage(currentMessageId, conversationReplyTo)
             }, 1000)
               
             return()=>clearInterval(interval)
        },[currentMessageId])



        // MODAL FOR OPENING CONVOS
        const {
            classModal
          } = props;

          const [modal, setModal] = useState(false);

          const toggle = () => 
          setModal(!modal);
            



return ( 
    <>
    <Container className="messaging-page-div">
        <Row>
            <Col>
            <h1 style={{color: "#315f72", margin: "30px"}}>My Conversations</h1>
            <div>
            {conversations!==undefined ? 
                conversations.conversation.map((conversation, index) => {
                    return(
                        <ListGroup className="conversation-list-group" onClick={ ()=> {
                            setConversationReplyTo(conversations.replyTo[index])
                            setCurrentMessageId(conversation.id)
                            viewMessage(conversation.id, conversations.replyTo[index])}}> 
                            <div>
                                <Button className="conversation-button-group" onClick={toggle}>
                                    <div className="conversation-button-content">
                                        <div > 
                                            Conversation with: 
                                        </div>  
                                        <div id="conversation-with-username"> {conversations.user !== undefined ? conversations.user.filter(user => user.id===conversations.replyTo[index])[0].username : null}
                                        {/* conversations.user.filter(user => user.id===conversations.replyTo[index])[0].username */}
                                        </div>
                                     </div>
                                </Button>{""}
                        <Modal isOpen={modal} toggle={toggle} className={classModal}>
                            <ModalHeader toggle={toggle}>Your messages with: {conversations.user.filter(user => user.id===conversations.replyTo[index])[0].username}</ModalHeader>
                            <ModalBody>
                                <ListGroup className="message-list-group">
                                    {messages!==undefined ? 
                                    messages.messages.map((message, index) => {
                                    return(  
                                        // onClick={ ()=> viewMessage(message.id)} -- in case you want to edit, delete, etc
                                        <ListGroupItem className="" 
                                            style={{ color: message.ownerId === +userId ? "#315f72" : "#f57e7e",
                                            textAlign: message.ownerId === +userId ? "right" : "left"
                                            }}>
                                        {message.content}
                                        </ListGroupItem>
                                        )
                                        }): null }
                                     </ListGroup>
                            </ModalBody>
                            <ModalFooter>
                            {/* <Button color="primary" onClick={toggle}>Do Something</Button>{' '} */}
                                <div>
                                    <MessageRespond replyTo={conversationReplyTo} className="message-respond-form" viewMessage={viewMessage} token={props.token}/>
                                </div>
                            </ModalFooter>
                        </Modal>
                        </div>        
                    </ListGroup>
                    
                           )}): null }
                </div>
            </Col>
        </Row>
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
        replyTo: number[];
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
