import React, { useState } from 'react';
import { Button, Toolbar, Modal, Box, TextField, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function CreateChatButton({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setChatName('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newChat = {'chat_name': chatName}
      await onCreate(newChat);  // Delegate the creation logic to the parent component         // Call the onChatCreated to potentially refresh chat list or similar action
      handleClose();             // Close the modal on success
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
              autoFocus
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
