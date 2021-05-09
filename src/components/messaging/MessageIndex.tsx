import React, { useState, useEffect } from 'react';
import {Button, Container, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody, ListGroup, ListGroupItem} from 'reactstrap';
import MessageRespond from './MessageRespond';
import "./Message.css";
import APIURL from '../../helpers/environment';

const MessageIndex = (props: any) => {

    const [conversations, setConversations] = useState<Conversation>();
    const [messages, setMessages] = useState<ViewMessageResponse>();
    const [conversationReplyTo, setConversationReplyTo] = useState(0);
    const [currentMessageId, setCurrentMessageId] = useState(0);
    const [userId, setUserId] = useState(localStorage.getItem("userId")? Number(localStorage.getItem("userId")): 0);

    const getConversations = () => {
        fetch(`${APIURL}/message/viewConversationList`, {
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
            console.log('list of Conversations -->', Messages);
        })
    }

    useEffect( () => {
        getConversations();
    }, [])

    function viewMessage (id: number, replyToId: number) {
            
            fetch(`${APIURL}/message/viewMessages/${id}`, {
                method: 'GET',
                headers:new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': props.token
                })
            })
            .then( (res) => res.json())
            .then((Messages) => {
                setMessages(Messages);
                
                console.log('list of messages -->', Messages);
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

   /* ********************** 
   START Delete Conversation
   *********************** */    
  
   const deleteConversation = (id: number) => {
    fetch(`${APIURL}/message/delete/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => {
      getConversations();
    });
  };

    /* ********************** 
    END Delete Conversation
    *********************** */    




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
                            <div className="conversations-map-div">
                                
                                <Button className="conversation-button-group" onClick={toggle}>
                                    <div className="conversation-button-content">
                                        <div > 
                                            Conversation with: 
                                        </div> 
                                        
                                        <div id="conversation-with-username"> {conversations.user !== undefined ? conversations.user.filter(user => user.id===conversations.replyTo[index])[0].username : null}
                                        </div>
                                     </div>
                                </Button>{""}
                                {/* START DELETE BUTTON */}
                                <Button className="conversation-delete-button" 
                                // onClick={deleteConversation}
                                onClick={() => deleteConversation(conversation.id)}>
                                DELETE
                                </Button>
                                {/* END DELETE BUTTON */}
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
        id: number; //?
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
function id(id: any): void {
    throw new Error('Function not implemented.');
}

