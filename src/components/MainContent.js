import React, { useState, useEffect } from 'react';
import { Box, Typography, Toolbar, List, ListItem, ListItemText, TextField, Button, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getChatById } from '../services/chat.services';  // Adjust the path as necessary

const drawerWidth = 240;

function MainContent({ messages,setMessages,sendChatMessage }) {
//  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');



  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        id: messages.length,  // This might not be the best way to assign IDs in a real app
        text: newMessage,
        role: 'user'
      };
      // setMessages([...messages, message]);
      
      sendChatMessage(message);
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
