import React, { useState, useEffect } from 'react';
import { Box, Typography, Toolbar, List, ListItem, ListItemText, TextField, Button, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getChatById } from '../services/chat.services';  // Adjust the path as necessary

const drawerWidth = 240;

function MainContent({ messages }) {
//  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // useEffect hook to fetch messages when selectedChat changes
//  useEffect(() => {
//    if (selectedChat !== null) {
//      // Fetch messages for the selected chat from the backend using getChatById
//      getChatById(selectedChat)
//        .then((chatDetails) => {
//          if (chatDetails && chatDetails.messages) {
//            setMessages(chatDetails.messages);  // Assume messages are part of the chatDetails response
//          } else {
//            setMessages([]);  // Reset or handle as needed if no messages are found
//          }
//        })
//        .catch((error) => {
//          console.error('Error fetching messages:', error);
//        });
//    } else {
//      setMessages([]);  // Reset messages when there is no selected chat
//    }
//  }, [selectedChat]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        id: messages.length,  // This might not be the best way to assign IDs in a real app
        text: newMessage,
        sender: 'user'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Toolbar />
      <List sx={{ overflow: 'auto', flexGrow: 1, mb: 2 }}>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText
              primary={<Typography color={message.role === 'bot' ? 'primary' : 'secondary'}>{message.text}</Typography>}
              sx={{ textAlign: message.role === 'bot' ? 'left' : 'right' }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        component="form"
        sx={{ display: 'flex', alignItems: 'center', p: 1 }}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button variant="contained" color="primary" sx={{ ml: 1 }} onClick={handleSendMessage}>
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default MainContent;
