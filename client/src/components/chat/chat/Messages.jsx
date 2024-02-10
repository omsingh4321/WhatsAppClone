import React, { useEffect, useState } from 'react'
import { Box,styled } from '@mui/material'
import Footer from './Footer'
import { useContext } from 'react'
import {newMessage,getMessage} from '../../services/api'
import {AccountContext} from '../../context/AccountProvider'
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
  const {account,socket,newMessageFlag,setNewMessageFlag} =useContext(AccountContext);
  const [messages,setMessages]= useState([]);
 
  const [file,setFile]=useState();
  const [image,setImage]=useState('');
  
  const [inCommingMsg,setIncommingMsgs]=useState(null);

  useEffect(()=>{
     const getMessageDetails=async()=>{
       let data=await getMessage(conversation._id);
       setMessages(data);
     }
  conversation._id && getMessageDetails();
  },[conversation._id,newMessageFlag]);

  useEffect(()=>{
    socket.current.on('getMessage',data=>{
      setIncommingMsgs({
        ...data,
        createdAt: Date.now()
      })
    })
  },[]);
  useEffect(()=>{
    inCommingMsg && conversation?.members?.includes(inCommingMsg.senderId) && 
    setMessages(prev=>[...prev,inCommingMsg])
  },[inCommingMsg,conversation])


const sendText= async(e)=>{
   
   const code = e.keyCode || e.which;
if(code===13){
  let message;
  if(!file){
message={
  senderId: account.sub,
  reciverId: person.sub,
  conversationId: conversation._id,
  type: 'text',
  text: text
}
  }
  else{
    message={
      senderId: account.sub,
      reciverId: person.sub,
      conversationId: conversation._id,
      type: 'file',
      text: image
    }
  }
 socket.current.emit('sendMessage',message);
 await newMessage(message);
  setText('');
  setFile('');
  setImage('');
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
        file={file}
        setFile={setFile}
        setImage={setImage}
        image={image}
      />
    </Wrapper>
  )
}

export default Messages
