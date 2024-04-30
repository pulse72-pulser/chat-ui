import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Badge } from '@mui/material';

function ChatList({ chats, onSelectChat, selectedChatId, unreadChats = [] }) {
  // Dummy data for testing
  const dummyChats = [
    { id: 1, name: 'Chat 1' },
    { id: 2, name: 'Chat 2' },
    { id: 3, name: 'Chat 3' }
  ];

  // Use the provided chats prop if available, otherwise fallback to dummy data
  const chatData = chats || dummyChats;

  return (
    <List>
      {chatData.map((chat) => (
        <ListItem key={chat.chat_id} disablePadding>
          <ListItemButton selected={chat.chat_id === selectedChatId} onClick={() => onSelectChat(chat.chat_id)}>
            <ListItemText primary={chat.chat_name} />
            {unreadChats.includes(chat.id) && (
              <Badge color="primary" variant="dot" overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default ChatList;