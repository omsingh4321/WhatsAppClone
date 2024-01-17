import React, { useEffect, useState } from 'react'
import { Box,styled } from '@mui/material'
import Footer from './Footer'
import { useContext } from 'react'
import {newMessage,getMessage} from '../../services/api'
import AccountProvider, {AccountContext} from '../../context/AccountProvider'
import Message from './Message'

const Wrapper=styled(Box)`
background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
background-size: 50%;

`
const Component=styled(Box)`
height: 76vh;
overflow-y: scroll;
`

const Messages = ({person,conversation}) => {
  const [text,setText]=useState('');
  const {account} =useContext(AccountContext);
  const [messages,setMessages]= useState([]);
  const [newMessageFlag,setNewMessageFlag]=useState(false);
  useEffect(()=>{
     const getMessageDetails=async()=>{
       let data=await getMessage(conversation._id);
       setMessages(data);
     }
  conversation._id && getMessageDetails();
  },[conversation._id,newMessageFlag])


  const sendText= async(e)=>{
   
   const code = e.keyCode || e.which;
if(code===13){
let message={
  senderId: account.sub,
  reciverId: person.sub,
  conversationId: conversation._id,
  type: 'text',
  text: text
}
 await newMessage(message);
  setText('');
  setNewMessageFlag(prev=>!prev);
}
  }
const Container=styled(Box)`
 padding: 1px 80px;

`


  return (
    <Wrapper>
      <Component>
      {
        messages && messages.map(message=>(
          <Container>
          <Message message={message}/>
          </Container>
        ))
      }
      </Component>
      <Footer sendText={sendText}
        setText={setText}
        text={text}
      />
    </Wrapper>
  )
}

export default Messages
