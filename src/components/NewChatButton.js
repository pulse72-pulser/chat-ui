import React, { useState } from 'react';
import { Button, Toolbar, Modal, Box, TextField, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function CreateChatButton({ onCreate, onChatCreated }) {
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Send the chat name data to the backend
      const response = await fetch('your-backend-url/create-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: chatName }),
      });
      if (response.ok) {
        // If the request is successful, update the chat list component
        onChatCreated();
        setChatName('');
        handleClose();
      } else {
        console.error('Failed to create chat:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toolbar>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          fullWidth
        >
          Create Chat
        </Button>
      </Toolbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-chat-modal-title"
        aria-describedby="create-chat-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={2}>
            <TextField
              label="Chat Name"
              variant="outlined"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !chatName.trim()}
            >
              {loading ? 'Creating...' : 'Submit'}
            </Button>
            <Button variant="outlined" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default CreateChatButton;