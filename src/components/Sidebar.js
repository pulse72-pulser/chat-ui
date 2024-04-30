// SideBar.js
import React, { useState } from 'react';
import { Box, Drawer, Divider } from '@mui/material';
import CreateChatButton from './NewChatButton';
import ChatList from './ChatList';
import MainContent from './MainContent';

const drawerWidth = 240;

function SideBar({ mobileOpen, handleDrawerClose, container, chats, onCreateChat }) {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chatId) => {
    // Handle chat selection
    setSelectedChat(chatId);
  };

  const drawerContent = (
    <div>
      <CreateChatButton onCreate={onCreateChat} />
      <Divider />
      <ChatList chats={chats} onSelectChat={handleSelectChat} />
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
      <MainContent selectedChat={selectedChat} />
    </Box>
  );
}

export default SideBar;