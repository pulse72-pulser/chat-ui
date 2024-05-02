import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemButton, ListItemText, Badge } from '@mui/material';

function ChatList({ chatData, onSelectChat, selectedChatId, unreadChats }) {

  return (
    <List>
      {chatData.map((chat) => (
        <ListItem key={chat.chat_id} disablePadding>
          <ListItemButton selected={chat.chat_id === selectedChatId} onClick={() => onSelectChat(chat.chat_id)}>
            <ListItemText primary={chat.chat_name} />
            {unreadChats.includes(chat.chat_id) && (
              <Badge color="primary" variant="dot" overlap="circular"
                     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

ChatList.propTypes = {
  chatData: PropTypes.arrayOf(PropTypes.shape({
    chat_id: PropTypes.number.isRequired,
    chat_name: PropTypes.string.isRequired,
  })).isRequired,
  onSelectChat: PropTypes.func.isRequired,
  selectedChatId: PropTypes.number,
  unreadChats: PropTypes.arrayOf(PropTypes.number),
};

ChatList.defaultProps = {
  selectedChatId: null,
  unreadChats: [],  // Default to an empty array if not provided
};

export default ChatList;
