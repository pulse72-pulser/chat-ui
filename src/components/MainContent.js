// MainContent.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Toolbar, List, ListItem, ListItemText, TextField, Button, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const drawerWidth = 240;

function MainContent({ selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // useEffect hook to fetch messages when selectedChat changes
  useEffect(() => {
    if (selectedChat !== null) {
      // Fetch messages for the selected chat from the backend
      fetchMessages(selectedChat)
        .then((messages) => {
          setMessages(messages);
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [selectedChat]);

  // Function to fetch messages from the backend
  const fetchMessages = async (chatId) => {
    // Simulated messages for demonstration
    return [
      { id: 0, text: 'Hello! How can I assist you today?', sender: 'bot' },
      { id: 1, text: 'Hi, I need help with my account.', sender: 'user' }
    ];
    // Replace with actual backend API call to fetch messages
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        id: messages.length,
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
              primary={<Typography color={message.sender === 'bot' ? 'primary' : 'secondary'}>{message.text}</Typography>}
              sx={{ textAlign: message.sender === 'bot' ? 'left' : 'right' }}
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