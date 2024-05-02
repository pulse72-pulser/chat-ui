// SideBar.js
import React, { useState } from 'react';
import { Box, Drawer, Divider } from '@mui/material';
import CreateChatButton from './NewChatButton';
import ChatList from './ChatList';

const drawerWidth = 240;

function SideBar({ mobileOpen, handleDrawerClose, container, chats=[], onChatSelect, selectedChat, onCreate }) {

  const handleSelectChat = (chatId) => {
    // Handle chat selection
    onChatSelect(chatId);
  };

  const drawerContent = (
    <div>
      <CreateChatButton onCreate={onCreate} />
      <Divider />
      {
        chats.length === 0 ? <p>No chats created.</p> :
        <ChatList chats={chats} onSelectChat={handleSelectChat} selectedChatId={selectedChat} />}
    </div>
  );

  // console.log("chats chats :",chats )

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
    </Box>
  );
}

export default SideBar;